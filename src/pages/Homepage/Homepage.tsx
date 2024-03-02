import React, { useEffect, useState } from "react";
import "../../styles/homepage.css";
import { Link } from "react-router-dom";

type Props = {};

const Homepage = (props: Props) => {
 
  return (

<div className="hero">
  <div className="text">
    <h4>Güçlü, eğlenceli ve</h4>
    <h1>Sürücüye <br/> <span>ÖZEL</span></h1>
    <p>Gerçek Zarafet, Gerçek Güç, Gerçek Performans.</p>
    <Link to={"/rental"} className="btn">Araç bul</Link>
  </div>

</div>
  );
};

export default Homepage;


