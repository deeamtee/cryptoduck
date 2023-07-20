import NavBar from './NavBar';
import DuckList from './DuckList';

function Ducks ({onSignOut}) {
  return (
    <>
      <NavBar onSignOut={onSignOut} />
      <DuckList />
    </>
  )
}

export default Ducks;