const Footer = () => {
  return (
    <footer className="bg-gray-100 flex flex-col sm:flex-row justify-between py-5 px-14 text-black">
      <small className="text-gray-600 text-center sm:text-left">
        Developed by{" "}
        <a href="" className="underline text-black">
          ABRANICO
        </a>
      </small>
      <small className="text-gray-600 text-center sm:text-left">© 2025</small>
      <small className="text-gray-600 text-center sm:text-left">
        Fork this project{" "}
        <a href="" className="underline text-black">
          HERE
        </a>
      </small>
    </footer>
  );
};

export default Footer;
