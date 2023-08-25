import HeaderWrapper from "@/components/header/HeaderWrapper";
import Footer from "@/components/footer/Footer";
import React, { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {}
export default function HeaderFooterLayout(props: Props) {

  return (
    <>
      <HeaderWrapper/>
      <div className="flex-grow">{props.children}</div>
      <Footer/>
    </>
  )

}