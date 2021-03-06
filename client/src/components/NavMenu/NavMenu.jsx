import React, {Component} from 'react';
import {NavLink, withRouter} from "react-router-dom";
import {connect} from 'react-redux';

import {Pane, Button, Paragraph} from "evergreen-ui";

import './NavMenu.css';
import {logout} from "../../redux/actions/userActions";


class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [
                {
                    title: 'Главная',
                    path: '/'
                },
                {
                    title: 'Группы',
                    path: '/groups'
                },
                {
                    title: 'Категории',
                    path: '/categories'
                },
            ],
        }
    }

    handleClickQuitBtn() {
        this.props.logout();
        this.props.history.push('/auth');
    }

    render() {

        return (
            <Pane
                minWidth={150}
                paddingRight={24}>
                <Pane
                    display='flex'
                    alignItems='center'
                    flexDirection='column'
                    padding={10}
                    paddingBottom={20}>
                    <Paragraph>{this.props.user.name}</Paragraph>
                    <Button
                        iconAfter="log-out"
                        onClick={this.handleClickQuitBtn.bind(this)}>
                        Выйти
                    </Button>
                </Pane>
                {this.state.links.map(link => (
                    <Button key={link.title} width='100%' appearance='minimal' display='flex' paddingX={0}>
                        <NavLink
                            className='nav-menu__item'
                            exact
                            to={link.path}>
                            {link.title}
                        </NavLink>
                    </Button>
                ))}
            </Pane>
        )
    }
}

export default connect(
    state => ({
        user: state.userData.user,
    }),
    dispatch => ({
        logout: () => {
            dispatch(logout())
        }
    })
)(withRouter(NavMenu));