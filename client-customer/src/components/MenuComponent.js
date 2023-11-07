import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  handleKeywordChange = (e) => {
    this.setState({ txtKeyword: e.target.value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  };

  render() {
    const { categories, txtKeyword } = this.state;
    const categoryList = categories.map((item) => (
      <li key={item._id} style={styles.navItem}>
        <Link to={'/product/category/' + item._id} style={styles.navLink}>{item.name}</Link>
      </li>
    ));

    return (
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>My Store</Link>
        <form onSubmit={this.handleSearchSubmit} style={styles.searchForm}>
          <input
            type="search"
            style={styles.searchInput}
            placeholder="Search products"
            value={txtKeyword}
            onChange={this.handleKeywordChange}
          />
          <button style={styles.searchButton} type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <ul style={styles.navbarNav}>
          {categoryList}
        </ul>
      </nav>
    );
  }
}

const styles = {
  navbar: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    textDecoration: 'none',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  searchForm: {
    flex: '1',
    marginLeft: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  searchInput: {
    padding: '8px',
    border: 'none',
    borderRadius: '4px',
    width: '250px',
  },
  searchButton: {
    padding: '8px',
    backgroundColor: '#555',
    border: 'none',
    borderRadius: '4px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
  navbarNav: {
    listStyle: 'none',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '16px',
  },
};

export default withRouter(Navbar);