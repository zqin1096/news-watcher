import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AsyncSelect from 'react-select/async';
import {BsBookmark} from 'react-icons/bs'; // Bookmark icon.
import {IconContext} from "react-icons"; // Used to style the react icons.
import Switch from 'react-switch';
// <Navlink> is a special version of the <Link> that will add styling attributes
// to the rendered element when it matches the current URL.
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import classes from './NavigationBar.module.css';
import {connect} from 'react-redux';
import {toggleSwitch} from '../../actions/newsAction';

const NavigationBar = (props) => {

    const loadOptions = (inputValue, callback) => {
        if (!inputValue) {
        } else {
            setTimeout(async () => {
                const config = {
                    // Set the Ocp-Apim-Subscription-Key header to the value of the Bing Autosuggest API key.
                    headers: {
                        'Ocp-Apim-Subscription-Key': '52b27e0662464f42b2f20c23db492ba7'
                    }
                };
                try {
                    const res = await axios.get(`https://zhaoyin-qin.cognitiveservices.azure.com/bing/v7.0/suggestions?q=${inputValue}`, config);
                    const options = res.data.suggestionGroups[0].searchSuggestions.map((option) => {
                        return {
                            value: option.displayText,
                            label: option.displayText
                        };
                    });
                    callback(options);
                } catch (e) {
                    console.log(e);
                }
            });
        }
    };

    // The react-select onChange event is fired when an option is selected.
    const onChange = (selectedOption) => {
        console.log(selectedOption.value);
    };

    return (
        // expand is the breakpoint, below which, the Navbar will collapse.
        <Navbar expand="lg" className={classes.bg}>
            <AsyncSelect
                onChange={onChange}
                cacheOptions
                loadOptions={loadOptions}
                placeholder="Enter keyword .."
                className={classes.searchbar}/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink to="/"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>Home</NavLink>
                    <NavLink to="/world"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>World</NavLink>
                    <NavLink to="/politics"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>Politics</NavLink>
                    <NavLink to="/business"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>Business</NavLink>
                    <NavLink to="/technology"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>Technology</NavLink>
                    <NavLink to="/sports"
                             exact
                             className={classes.link}
                             activeClassName={classes.selected}>Sports</NavLink>
                </Nav>
                <Nav>
                    <Nav.Item className={classes.navItem}>
                        <IconContext.Provider
                            value={{color: 'white', size: '1.5em'}}>
                            <BsBookmark/>
                        </IconContext.Provider>
                    </Nav.Item>
                    <Nav.Item className={classes.navItem}>NYTimes</Nav.Item>
                    <Nav.Item className={classes.navItem}>
                        <Switch
                            checked={props.isChecked}
                            onChange={(checked) => {
                                props.toggleSwitch(checked);
                            }}
                            onColor="#4696EC"
                            checkedIcon={false}
                            uncheckedIcon={false}/>
                    </Nav.Item>
                    <Nav.Item className={classes.navItem}>Guardian</Nav.Item>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        </Navbar>
    )
};

const mapStateToProps = (state) => {
    return {
        isChecked: state.news.isChecked
    }
}

export default connect(mapStateToProps, {toggleSwitch})(NavigationBar);