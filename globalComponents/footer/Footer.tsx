import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              {" "}
              Aura knot
            </h3>
            <p className="text-sm">
              {" "}
             Thank you for reaching out ---- your love for handmade art means a lot to us!
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
                Quick links
            </h3>
            <ul className="space-y-2 text-sm">
                <li><Link href={"/about"}>Home</Link></li>
                <li><Link href={"/about"}>About Us</Link></li>
                <li><Link href={"/services"}>Shop</Link></li>
                <li><Link href={"/services"}>Terms & Conditions</Link></li>
                <li><Link href={"/services"}>Privacy Policy</Link></li>
                <li><Link href={"/services"}>Return & Refund Policy</Link></li>
               
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
                Our Products
            </h3>
            <ul>
                <li> <Link href={"#"}>Woolen Products</Link> </li>
                <li> <Link href={"#"}>Quilling Arts</Link> </li>
                <li> <Link href={"#"}>Sketches</Link> </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4" >
                Contact Us
            </h3>
                <ul>
                <li> <Link href={"/contact"}>7028873272</Link> </li>
                <li> <Link href={"/faq"}>kannyabhoir@gmail.com</Link> </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
