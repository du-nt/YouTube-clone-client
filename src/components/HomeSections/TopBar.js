import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import Header from "../HeaderSections/Header";
import Search from "./Search";
import Overlay from "./Overlay";
import Menu from "../MenuSections/Menu";
import LoggedMenu from "../MenuSections/LoggedMenu";
import { useSelector } from "react-redux";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const openSearch = () => {
    setOpen(true);
  };

  const closeSearch = () => {
    setOpen(false);
  };

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <>
        {open ? (
          <Search closeSearch={closeSearch} />
        ) : (
          <Header openSearch={openSearch} openMenu={openMenu} />
        )}
        {open && <Overlay closeSearch={closeSearch} />}
      </>
      {isOpen && (
        <Dialog fullScreen open={isOpen}>
          {isAuthenticated ? (
            <LoggedMenu closeMenu={closeMenu} />
          ) : (
            <Menu closeMenu={closeMenu} />
          )}
        </Dialog>
      )}
    </>
  );
}
