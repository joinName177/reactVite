import React from "react";
import "../../styles/pages/Home.less";
import { Link, Outlet } from "react-router-dom";


const navList = [
  {
    name: "Excel转图片",
    path: "/home/excelToImg",
  },
  {
    name: "图片转Excel",
    path: "/home/imgToExcel",
  },
];

const Home: React.FC = () => {
  return <div className="home-container">
    <div className="home-container-left">
      {navList.map((item) => (
        <div className="home-container-left-item" key={item.name}>
          <Link to={item.path}>{item.name}</Link>
        </div>
      ))}
    </div>
    <div className="home-container-right">
      <Outlet />
    </div>
  </div>;
};

export default Home;
