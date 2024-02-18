import React from 'react';
// import UsersAPIComponent from './UsersAPIComponent';
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';
import { follow, unfollow, followSuccess, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollowSuccess, toggleFollowingProgress, requestUsers, setSearchedUserName } from '../../redux/users-reducer';
import { connect } from 'react-redux';
import axios from 'axios';
import Users from './Users';
import { usersAPI } from '../../api/api';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsAuth, getIsFetching, getName, getPageSize, getTotalUsersCount, getUsers, getSearchedUserName, getIsReceivedResponse} from '../../redux/users-selectors';
import { useState } from 'react';


class UsersContainer extends React.Component {



    // constructor(props){
    //     super(props)

    // }

    componentDidMount() {
        if (this.props.users.length === 0 && this.props.searchedUserName){} //optional (so that during transitions the preloader is not shown again)
        else if (this.props.users.length === 0) { this.props.requestUsers(this.props.currentPage, this.props.pageSize, this.props.searchedUserName) }
          
        // this.props.toggleIsFetching(true);
        // usersAPI.requestUsers(this.props.currentPage, this.props.pageSize).then(data => {
        //         return this.props.setUsers(data.items),
        //             this.props.setTotalUsersCount(data.totalCount),
        //             this.props.toggleIsFetching(false)
        //     })
    }



    onPageChanged = (pageNumber) => {
        //setCurrentPage can be put in thunk(requestUsers)
        this.props.setCurrentPage(pageNumber); //in lesson 81 Dima put this inside requestUsers
        this.props.requestUsers(pageNumber, this.props.pageSize, this.props.searchedUserName);
        // this.props.toggleIsFetching(true);
        // this.props.setCurrentPage(pageNumber);
        // usersAPI.requestUsers(pageNumber, this.props.pageSize).then(data => {
        //         return this.props.setUsers(data.items),
        //             this.props.toggleIsFetching(false)
        //     })
    }

    onSearchUser = async (values) => {
        await this.props.setCurrentPage(1);
        this.props.requestUsers(this.props.currentPage, this.props.pageSize, values); //values.searchedUserName with redux-form
    }




    render() {
        return (<>
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                onPageChanged={this.onPageChanged}
                currentPage={this.props.currentPage}
                users={this.props.users}
                unfollowSuccess={this.props.unfollowSuccess}
                followSuccess={this.props.followSuccess}
                isFetching={this.props.isFetching}
                followingInProgress={this.props.followingInProgress}
                toggleFollowingProgress={this.props.toggleFollowingProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isAuth={this.props.isAuth}
                setSearchedUserName={this.props.setSearchedUserName}
                onSearchUser={this.onSearchUser}
                isReceivedResponse={this.props.isReceivedResponse}
            />
        </>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        isAuth: getIsAuth(state),
        searchedUserName: getSearchedUserName(state),
        isReceivedResponse: getIsReceivedResponse(state)
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





// export default withAuthRedirect(connect(mapStateToProps, {

//     followSuccess,
//     unfollowSuccess,
//     setUsers,
//     setTotalUsersCount,
//     setCurrentPage,
//     toggleIsFetching,
//     toggleFollowingProgress,
//     getUsers, //requestUsers new
//     follow,
//     unfollow
// })(UsersContainer));

export default compose(
    connect(mapStateToProps, {
        followSuccess,
        unfollowSuccess,
        setUsers,
        setTotalUsersCount,
        setCurrentPage,
        toggleIsFetching,
        toggleFollowingProgress,
        requestUsers,
        follow,
        unfollow,
        setSearchedUserName

    }),
    // withAuthRedirect
)(UsersContainer)

// export default UsersContainer;

