/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/order */
/* eslint-disable react/self-closing-comp */
/* eslint-disable padding-line-between-statements */
/* eslint-disable prettier/prettier */
"use client";

import { useGetAllUser } from "@/src/hook/auth.hook";
import {
  Changerole,
  ChangeUserStatus,
  deleteUser,
} from "@/src/services/AuthService";
import { DeleteIcon, EditIcon } from "@/src/utils/icon";
import { EyeIcon } from "@heroicons/react/24/solid";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { User } from "@nextui-org/user";
import React from "react";
import { toast } from "sonner";

const columns = [
  { name: "NAME", uid: "name" },
  { name: "ROLE", uid: "role" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const UsersSection = () => {
  const [users, usersRefetch] = useGetAllUser();

  const handlechangeUserStatus = async (id: string, e: any) => {
    const responce = await ChangeUserStatus(id, e);

    if (responce.success) {
      usersRefetch();
      toast.success(`User Status ${e}`);
    }
  };

  const handleChangeUserRole = async (id: string, Role: string) => {
    const res = await Changerole(id, Role);

    if (res.success) {
      toast.success("User Role Change!");
      usersRefetch();
    }
  };

  const handleDeleteUser = async (id: string) => {
    const res = await deleteUser(id);

    if (res.success) {
      toast.success("User Deleted!");
      usersRefetch();
    }
  };
  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {columns.map((col) => (
          <TableColumn key={col?.uid} align={"start"}>
            {col.name}
          </TableColumn>
        ))}
      </TableHeader>

      <TableBody items={"users"}>
        {users?.data?.map((user: any) => (
          <TableRow key={user?._id}>
            {/* user email and name  */}
            <TableCell>
              <User
                avatarProps={{
                  radius: "lg",
                  src: user?.image,
                }}
                description={user.email}
                name={user.name}
              ></User>
            </TableCell>

            {/* role  */}
            <TableCell>
              <div className="flex flex-col">
                <p className="text-bold text-sm capitalize text-default-400">
                  {user?.role}
                </p>
              </div>
            </TableCell>

            {/* in progress  */}
            <TableCell>
              <Chip
                className="capitalize"
                color={
                  user?.status == "in-progress"
                    ? "success"
                    : user?.status == "Block"
                      ? "danger"
                      : "warning"
                }
                size="sm"
                variant="flat"
              >
                {user?.status}
              </Chip>
            </TableCell>

            {/* action  */}
            <TableCell>
              <div className="relative flex items-center gap-2">
                <Tooltip content="Details">
                  <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon />
                  </span>
                </Tooltip>
                <Tooltip content="Edit user">
                  <Dropdown>
                    <DropdownTrigger>
                      <Button
                        className="capitalize"
                        size="sm"
                        variant="bordered"
                      >
                        <EditIcon />
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      disallowEmptySelection
                      aria-label="Single selection example"
                      selectedKeys={user.status}
                      selectionMode="single"
                      variant="flat"
                      onSelectionChange={async (e) =>
                        await handlechangeUserStatus(user._id, e.currentKey)
                      }
                    >
                      <DropdownItem key="in-progress" value={"in-progress"}>
                        Progress User
                      </DropdownItem>
                      <DropdownItem key="Block" value={"block"}>
                        Block User
                      </DropdownItem>
                      <DropdownItem key="Pending" value={"pending"}>
                        Pending User
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Tooltip>
                <Tooltip color="danger" content="Delete user">
                  <span
                    onClick={() => handleDeleteUser(user._id)}
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
                {user.role == "user" && (
                  <Tooltip color="primary" content="Make Admin">
                    <span className="text-lg text-blue-500 cursor-pointer active:opacity-50">
                      <svg
                        onClick={() => handleChangeUserRole(user._id, "admin")}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6   cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
                        />
                      </svg>
                    </span>
                  </Tooltip>
                )}
                {user.role == "admin" && (
                  <Tooltip color="primary" content="Make User">
                    <svg
                      onClick={() => handleChangeUserRole(user._id, "user")}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 cursor-pointer text-blue-500"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                      />
                    </svg>
                  </Tooltip>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersSection;
