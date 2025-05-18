"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ToggleMenuProps {
  className?: string;
  menuItems: ToggleMenuItems[];
}
export interface ToggleMenuItems{
  link: string;
  linkText: string;
}

export function ToggleMenu({ className, menuItems }: ToggleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={className}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle Menu"
        onClick={toggleMenu} 
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
      {isOpen && (
        <div className="absolute top-16 left-0 right-0 z-50 bg-background border-b p-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            {menuItems.map((item,iterator)=>{
              return(<a key={iterator} href={item.link} className="hover:text-primary">{item.linkText}</a>)
            })}
            {/* <a href="#pricing" className="hover:text-primary">Pricing</a>
            <a href="#about" className="hover:text-primary">About</a>
            <a href="#contact" className="hover:text-primary">Contact</a> */}
          </nav>
        </div>
      )}
    </div>
  );
}

