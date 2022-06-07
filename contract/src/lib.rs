#![no_std]

// 1️⃣ External packages (crates) and internal modules import
use codec::{Decode, Encode};
use gstd::{debug, exec, msg, prelude::*, ActorId};
use scale_info::TypeInfo;

// 2️⃣ This defines the meta information about the contract
// for the Gear IDEA portal to parse.
// It also defines the communication interface via input / output fields.
gstd::metadata! {
    title: "Guestbook",
    handle:
        input: Action,
    state:
        output: Vec<Message>,
}

#[derive(Debug, TypeInfo, Encode, Decode)]
pub enum Action {
    AddMessage(String),
}

#[derive(Clone, Debug, Encode, TypeInfo)]
pub struct Message {
    autor: ActorId,
    text: String,
    timestamp: u32,
}

#[derive(Clone)]
pub struct State {
    messages: Vec<Message>,
}

impl State {
    pub const fn new() -> Self {
        Self {
            messages: Vec::new(),
        }
    }

    pub fn add_message(&mut self, message: Message) {
        self.messages.push(message);
    }
}

// 3️⃣ The state itself (i.e. the variable state will be accessed through)
static mut STATE: State = State::new();

// 5️⃣ Handle function that processes the incoming message
#[no_mangle]
pub unsafe extern "C" fn handle() {
    let action: Action = msg::load().unwrap();

    debug!("Received action: {:?}", action);

    match action {
        Action::AddMessage(text) => {
            let message = Message {
                autor: msg::source(),
                text,
                timestamp: exec::block_height(),
            };

            STATE.add_message(message.clone());

            msg::reply(message.clone(), 0).unwrap();

            debug!("Added new post: {:?}", message);
        }
    }
}

#[no_mangle]
pub unsafe extern "C" fn meta_state() -> *mut [i32; 2] {
    let messages: Vec<Message> = STATE.messages.clone();
    let encoded = messages.encode();

    gstd::util::to_leak_ptr(encoded)
}

#[cfg(test)]
mod tests {
    use crate::{Action, Message};
    use gstd::prelude::*;
    use gtest::{Program, System};

    #[test]
    fn add_message() {
        let system = System::new();
        system.init_logger();

        let program = Program::current(&system);

        let res = program.send_bytes(42, "Init");
        assert!(res.log().is_empty());

        let res = program.send(42, Action::AddMessage("Hello".to_string()));
        let message = Message {
            autor: 42.into(),
            text: "Hello".to_string(),
            timestamp: 0,
        };
        assert!(res.contains(&(42, message.encode())));
    }
}
