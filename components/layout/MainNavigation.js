import Link from "next/link"

import classes from './MainNavigation.module.css';

function MainNavigation() {

  return (
    <header className={classes.header}>
      <div className={classes.logo}>React Meetups</div>
      <nav>
        <ul>
          <li>
            <Link href='/'><a className="main_nav_link">All Meetups</a></Link>
          </li>
          <li>
            <Link href='/new-meetup'><a className="main_nav_link">Add New Meetup</a></Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
