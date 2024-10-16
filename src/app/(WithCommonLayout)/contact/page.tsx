/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */

import { Button } from "@nextui-org/button";


export default function contactPage() {
  return (
    <div className=" min-h-screen py-10 px-4">
    <div className="max-w-4xl mx-auto  shadow-lg rounded-lg p-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-default-gray-800">
        Contact Us
      </h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-default-gray-700">Name</label>
            <input
              type="text"
              className="mt-1 block w-full px-4 py-2 bg-default-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="mt-1 block w-full px-4 py-2 bg-default-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div>
          <label className="block text-default-gray-700">Subject</label>
          <input
            type="text"
            className="mt-1 block w-full px-4 py-2 bg-default-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            placeholder="Enter subject"
          />
        </div>
        <div>
          <label className="block text-default-gray-700">Message</label>
          <textarea
            className="mt-1 block w-full px-4 py-2 bg-default-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            rows={5}
            placeholder="Enter your message"
          />
        </div>
        <div className="text-center">
          <Button color="primary" variant="shadow"> 
            Send Message
          </Button>
        </div>
      </form>
    </div>
  </div>

  );
}
