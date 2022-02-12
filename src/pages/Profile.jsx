import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userProfile: {},
      loadPage: true,
    };
  }

  async componentDidMount() {
    const getUserProfile = await getUser();
    this.setState({
      userProfile: getUserProfile,
      loadPage: false,
    });
  }

  render() {
    const { userProfile, loadPage } = this.state;
    console.log(userProfile);
    return (
      <div data-testid="page-profile">
        <Header />
        {loadPage ? <Loading />
          : (
            <section>
              <img
                src={ userProfile.image }
                alt="foto do perfil"
                data-testid="profile-image"
              />
              <Link to="/profile/edit"> Editar perfil </Link>
              <h2>
                Nome:
                <p>{userProfile.name}</p>
              </h2>
              <h2>
                E-mail:
                <p>{userProfile.email}</p>
              </h2>
              <h2>
                Descrição:
                <p>{userProfile.description}</p>
              </h2>
            </section>
          )}
      </div>
    );
  }
}

export default Profile;
