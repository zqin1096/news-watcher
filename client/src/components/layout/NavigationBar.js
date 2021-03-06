import React, {useEffect} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AsyncSelect from 'react-select/async';
import {BsBookmark, BsBookmarkFill} from 'react-icons/bs'; // Bookmark icon.
import {IconContext} from "react-icons"; // Used to style the react icons.
import Switch from 'react-switch';
// <Navlink> is a special version of the <Link> that will add styling attributes
// to the rendered element when it matches the current URL.
import {NavLink, withRouter} from 'react-router-dom';
import axios from 'axios';
import classes from './NavigationBar.module.css';
import {connect} from 'react-redux';
import {toggleSwitch} from '../../actions/newsAction';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';

const NavigationBar = (props) => {
    useEffect(() => {
        ReactTooltip.rebuild();
    }, [props.isInBookmarkTab]);

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
        // Need withRouter from react-router-dom.
        props.history.push(`/news/search?q=${selectedOption.value}`);
    };

    return (
        // expand is the breakpoint, below which, the Navbar will collapse.
        <Navbar expand="lg" className={classes.bg}>
            <AsyncSelect
                value={null}
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
                        <NavLink
                            to="/news/favorites"
                            exact>
                            {props.isInBookmarkTab ?
                                <IconContext.Provider
                                    value={{color: 'white', size: '1.5em'}}>
                                    <BsBookmarkFill data-for="bookmarkFill"
                                                    data-tip="Bookmark"/>
                                    <ReactTooltip id="bookmarkFill"
                                                  place="bottom" type="dark"
                                                  effect="solid"/>
                                </IconContext.Provider> :
                                <IconContext.Provider
                                    value={{color: 'white', size: '1.5em'}}>
                                    <BsBookmark data-for="bookmarkNotFill"
                                                data-tip="Bookmark"/>
                                    <ReactTooltip id="bookmarkNotFill"
                                                  place="bottom" type="dark"
                                                  effect="solid"/>
                                </IconContext.Provider>}
                        </NavLink>
                    </Nav.Item>
                    {props.showSwitch &&
                    <Nav>
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
                        <Nav.Item
                            className={classes.navItem}>Guardian</Nav.Item>
                    </Nav>
                    }
                </Nav>
            </Navbar.Collapse>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        </Navbar>
    )
};

NavigationBar.propTypes = {
    isChecked: PropTypes.bool.isRequired,
    showSwitch: PropTypes.bool.isRequired,
    isInBookmarkTab: PropTypes.bool.isRequired,
    toggleSwitch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
    return {
        isChecked: state.news.isChecked,
        showSwitch: state.navbar.showSwitch,
        isInBookmarkTab: state.bookmark.isInBookmarkTab
    }
}

export default connect(mapStateToProps, {toggleSwitch})(withRouter(NavigationBar));