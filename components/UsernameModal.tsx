import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useSocket } from "../context/socketContext";

type Props = {
  isOpen: boolean;
  setIsOpen: Function;
};

const UsernameModal = (props: Props) => {
  const [name, setName] = useState("");
  const { isOpen, setIsOpen } = props;
  const { setUsername } = useSocket();

  const onSubmit = (e: any) => {
    e.preventDefault();

    if (name) {
      localStorage.setItem("username", name);
      setUsername(name);
      setIsOpen(false);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto transition ease-in-out backdrop-blur-sm"
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 space-y-12 overflow-hidden text-left align-middle transition-all transform shadow-xl bg-primary rounded-2xl">
              <Dialog.Title
                as="h3"
                className="p-2 text-xl font-medium leading-6 text-white "
              >
                Your name
              </Dialog.Title>
              <form
                onSubmit={onSubmit}
                className="mt-4 mb-6 rounded-lg shadow-md"
              >
                <div className="relative mt-1">
                  <input
                    type="text"
                    id="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 pr-12 rounded-lg "
                    placeholder="Name"
                  />
                </div>
              </form>

              <button
                type="submit"
                className="block w-full px-5 py-3 text-white bg-pink-500 rounded-lg"
              >
                Proceed
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UsernameModal;
