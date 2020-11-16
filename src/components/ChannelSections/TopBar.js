import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import Header from "./Header";
import Search from "./Search";
import Overlay from "./Overlay";
import Menu from "./Menu";

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
        <Dialog open={isOpen} onClose={closeMenu}>
          <Menu closeMenu={closeMenu} />
        </Dialog>
      )}
    </>
  );
}
