import React from 'react';
// import UsersAPIComponent from './UsersAPIComponent';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, toggleFollowingProgress } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import Users from './Users';
import { usersAPI } from '../../api/api';



class UsersContainer extends React.Component {

    // constructor(props){
    //     super(props)

    // }

    componentDidMount() {

        this.props.toggleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                return this.props.setUsers(data.items),
                    this.props.setTotalUsersCount(data.totalCount),
                    this.props.toggleIsFetching(false)
            })
    }


    onPageChanged = (pageNumber) => {
        this.props.toggleIsFetching(true);
        this.props.setCurrentPage(pageNumber);
        usersAPI.getUsers(pageNumber, this.props.pageSize).then(data => {
                return this.props.setUsers(data.items),
                    this.props.toggleIsFetching(false)
            })
    }


    // getUsers() {
    //     if(this.props.users.length === 0){
    //         axios.get('https://social-network.samuraijs.com/api/1.0/users')

    //         .then(response => this.props.setUsers(response.data.items))

    //      }
    // }

    render() {
        return (<>
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}

            />
        </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {

//         follow: (userId) => {
//             dispatch(followActionCreator(userId))
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowActionCreator(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersActionCreator(users))
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }



// export default connect(mapStateToProps, {

//     follow: followActionCreator,
//     unfollow: unfollowActionCreator,
//     setUsers:setUsersActionCreator,
//     setTotalUsersCount: setTotalUsersCountAC,
//     setCurrentPage: setCurrentPageAC,
//     toggleIsFetching: toggleIsFetchingAC
// })(UsersContainer);


export default connect(mapStateToProps, {

    follow,
    unfollow,
    setUsers,
    setTotalUsersCount,
    setCurrentPage,
    toggleIsFetching,
    toggleFollowingProgress
})(UsersContainer);

// export default UsersContainer;

