import React from 'react';
import userImg from '../../assets/images/userImg.png';
import styles from './User.module.css';
import { NavLink } from 'react-router-dom';



const User = ({ user, followingInProgress, unfollow, follow, ...props }) => {
    let u = user;
    return (
        <div className={styles.userWrapper} key={u.id}>
            <span>
                <NavLink to={'/profile/' + u.id}><img src={u.photos.small != null ? u.photos.small : userImg} className={styles.userPhoto} /></NavLink>

                <div>
                    {u.followed
                        ? <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                            unfollow(u.id, props.isAuth)
                            //  props.toggleFollowingProgress(true,u.id) 
                            // usersAPI.unfollow(u.id)
                            //     .then(data => {
                            //         if (data.resultCode === 0) { props.unfollowSuccess(u.id) }
                            //         props.toggleFollowingProgress(false,u.id)
                            //     })
                        }}>Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === u.id)} onClick={() => {
                            follow(u.id, props.isAuth)
                            // props.toggleFollowingProgress(true,u.id)
                            // usersAPI.follow(u.id)
                            //     .then(data => {
                            //         if (data.resultCode === 0) { props.followSuccess(u.id) }
                            //         props.toggleFollowingProgress(false,u.id)
                            //     })
                        }}>Follow</button>}
                </div>
            </span>
            <span>
                <span>
                    <div>{u.name}</div>
                    <div>{u.status}</div>
                </span>
            </span>
        </div>
    )

}
export default User;





                {/* learned stopPropagation */}
                {/* <div onClick={()=>{console.log('container clicked')}} style={{backgroundColor: 'blue'}}>
                      <button onClick={(e)=>{console.log('btn clicked');
                    e.stopPropagation();}}>test</button>
                    </div> */}
