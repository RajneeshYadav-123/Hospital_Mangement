import React from "react";
import Header from "../components/header";
import MidSlider from "../components/MidSlider";
import {Mid2Page} from "../components/midPage";
import MapEmbed from "../components/MapEmbed";
import Footer from "../components/footer"
export const Home = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-50">
        <Header />
      </div>

      <div className="pt-20">
        <MidSlider />
      </div>

      <Mid2Page/>
      <MapEmbed/>
      <Footer/>
    </div>
  );
};
