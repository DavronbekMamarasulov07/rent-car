import { Link } from "react-router-dom";
import Container from "../container/Container";
import styles from  "./Footer.module.css"

const Footer = () => {
  return (
    <footer className="mt-[93px] w-full boxShadow py-20 shadow-lg ">
      <Container>
        <div className="flex flex-col">
          <div className="flex items-start justify-between border-b-2 border-slate-300 pb-9">
            <div className="flex w-full max-w-[292px] flex-col items-start justify-between gap-4">
              <Link to={"/"}>
                <h2 className="text-[40px] font-bold text-[#596780]">
                  DM-Rent
                </h2>
              </Link>
              <span className={styles.text}>
                Our vision is to provide convenience and help increase your
                sales business.
              </span>
            </div>

            <div className="flex gap-14">
              <div className="flex w-[152px] flex-col gap-6">
                <span className={styles.title}>
                  About
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                  <span className={styles.text}>How</span>
                  <span className={styles.text}>Featured</span>
                  <span className={styles.text}>Partnership</span>
                  <span className={styles.text}>
                    Bussiness Relation
                  </span>
                </div>
              </div>

              <div className="flex w-[152px] flex-col gap-6">
                <span className={styles.title}>
                  Community
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                  <span className={styles.text}>Events</span>
                  <span className={styles.text}>Blog</span>
                  <span className={styles.text}>Podcast</span>
                  <span className={styles.text}>Invite a friend</span>
                </div>
              </div>

              <div className="flex w-[152px] flex-col gap-6">
                <span className={styles.title}>
                  Socials
                </span>
                <div className="flex flex-col gap-3 text-base font-medium text-[#131313]">
                  <span className={styles.text}>Discord</span>
                  <span className={styles.text}>Instagram</span>
                  <span className={styles.text}>Twitter</span>
                  <span className={styles.text}>Facebook</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-between pt-9">
            <span className={styles.text2}>
              ©2024 MORENT. All rights reserved
            </span>
            <div className="flex items-center gap-14">
              <span className={styles.text2}>
                Privacy & Policy
              </span>
              <span className={styles.text2}>
                Terms & Condition
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
