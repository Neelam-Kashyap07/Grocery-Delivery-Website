const Footer = () => {
  return (
    <div className="text-gray-500/80 pt-8 px-6 md:px-16 lg:px-24 xl:px-32">
      <div className="flex flex-wrap justify-between gap-12 md:gap-6">
        
        {/* LEFT SECTION – KEEP */}
        <div className="max-w-80">
          <h1 className="text-3xl font-semibold text-[#212121]">
            Grocery App
          </h1>
          <p className="text-sm">
           Grocery App is a simple and user-friendly platform to browse products,
           manage cart items, and place grocery orders online with ease.
          </p>

          {/* SOCIAL ICONS – REMOVED FOR NOW */}
          {/*
          <div className="flex items-center gap-3 mt-4">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">...</svg>
          </div>
          */}
        </div>

        {/* COMPANY LINKS – REMOVED */}
        {/*
        <div>
          <p className="text-lg text-gray-800">COMPANY</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><a href="#">About</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Partners</a></li>
          </ul>
        </div>
        */}

        {/* SUPPORT LINKS – REMOVED */}
        {/*
        <div>
          <p className="text-lg text-gray-800">SUPPORT</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Information</a></li>
            <li><a href="#">Cancellation Options</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        */}

        {/* NEWSLETTER – REMOVED */}
        {/*
        <div className="max-w-80">
          <p className="text-lg text-gray-800">STAY UPDATED</p>
          <p className="mt-3 text-sm">
            Subscribe to our newsletter for inspiration and special offers.
          </p>
          <div className="flex items-center mt-4">
            <input
              type="text"
              className="bg-white rounded-l border border-gray-300 h-9 px-3 outline-none"
              placeholder="Your email"
            />
            <button className="flex items-center justify-center bg-black h-9 w-9 rounded-r">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24">...</svg>
            </button>
          </div>
        </div>
        */}
      </div>

      <hr className="border-gray-300 mt-8" />

      {/* FOOTER BOTTOM LINKS – SIMPLIFIED */}
      <div className="flex items-center justify-center py-5">
        <p>© {new Date().getFullYear()} Brand. All rights reserved.</p>

        {/*
        <ul className="flex items-center gap-4">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
        */}
      </div>
    </div>
  );
};

export default Footer;
