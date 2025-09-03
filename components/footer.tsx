
export default function Footer() {
    return (
    <div style={{ "fontFamily": "Space Mono"}} data-theme="dark" className="rounded-tr-4xl rounded-tl-4xl">
        <footer className=" rounded-tr-4xl rounded-tl-4xl footer sm:footer-horizontal text-white grid-rows-2 p-10">
  <nav>
    <h6 className="footer-title text-xl font-black" style={{ fontFamily: "Space Mono"}}>Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav style={{ "fontFamily": "Space Mono"}}>
    <h6 className="footer-title text-xl" style={{ fontFamily: "Space Mono"}}>Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title text-xl" style={{ fontFamily: "Space Mono"}}>Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
  <nav>
    <h6 className="footer-title text-xl" style={{ fontFamily: "Space Mono"}}>Social</h6>
    <a className="link link-hover">Twitter</a>
    <a className="link link-hover">Instagram</a>
    <a className="link link-hover">Facebook</a>
    <a className="link link-hover">GitHub</a>
  </nav>
  <nav>
    <h6 className="footer-title text-xl" style={{ fontFamily: "Space Mono"}}>Explore</h6>
    <a className="link link-hover">Features</a>
    <a className="link link-hover">Enterprise</a>
    <a className="link link-hover">Security</a>
    <a className="link link-hover">Pricing</a>
  </nav>
  <nav>
    <h6 className="footer-title text-xl" style={{ fontFamily: "Space Mono"}}>Apps</h6>
    <a className="link link-hover">Mac</a>
    <a className="link link-hover">Windows</a>
    <a className="link link-hover">iPhone</a>
    <a className="link link-hover">Android</a>
  </nav>
    </footer>
</div>
    );
}