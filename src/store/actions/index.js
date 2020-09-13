export {
    goDark, 
    goLight,
    switchTab,
    openModal,
    closeModal,
    openMenu,
    closeMenu,
    openAuth,
    closeAuth,
} from './UIActions';

export {
    fetchIds,
    //fetchComments,
    swipe,
    selectDropTarget,
    unSelectDropTarget,
    addComment,
    deleteComment,
    selectComment,
    unSelectComment,
    setDrop,
    memeLoaded,
    commentSaved,
    postCommentFailed
} from './streamActions';

export {
    send,
    changeChat
} from './chatActions';

export {
    login,
    logout,
    signup,
    checkEmail,
    checkHandle
} from './authActions';