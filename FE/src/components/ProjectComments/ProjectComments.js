import React, { useState } from "react";
import axios from "axios";
import { BiSolidCommentDetail } from "react-icons/bi";
import { BsFlagFill } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PropTypes from "prop-types";
import "./ProjectComments.css";

const ProjectComments = ({ dummyComments, sendDataToParent, projectId }) => {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [subInputValue, setSubInputValue] = useState("");
  const [viewAllComments, setViewAllComments] = useState(false);
  const [lastCommentIndex, setLastCommentIndex] = useState(
    dummyComments.length - 1
  );
  const usertoken = localStorage.getItem("token");
  const usertype = localStorage.getItem("userType");
  const [openReplyInput, setOpenReplyInput] = useState(null);
  const totalComments = (dummyComments || []).filter((b) => b.disable !== 1).length;
  const [commentOwnerFirstName, setCommentOwnerFirstName] = useState("");
  let postParentCommentURL = "http://localhost:3000/api/add/comment";
  let postSubCommentURL = "http://localhost:3000/api/add/sub-comment";
  let flagComment = "http://localhost:3000/api/flag/comment";
  let flagsubComment = "http://localhost:3000/api/flag/sub-comment";

  if (usertype === "student") {
    postParentCommentURL = "http://localhost:3000/student/add/comment";
    postSubCommentURL = "http://localhost:3000/student/add/sub-comment";
    flagComment = "http://localhost:3000/api/flag/comment";
    flagsubComment = "http://localhost:3000/api/flag/sub-comment";
  } else if (usertype === "guestUser") {
    postParentCommentURL = "http://localhost:3000/api/add/comment";
    postSubCommentURL = "http://localhost:3000/api/add/sub-comment";
    flagComment = "http://localhost:3000/api/flag/comment";
    flagsubComment = "http://localhost:3000/api/flag/sub-comment";
  }

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const headers = {
    token: usertoken,
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubInputChange = (e) => {
    setSubInputValue(e.target.value);
  };

  const toggleReplies = (commentId, commentOwnerFirstName) => {
    setOpenReplyInput(commentId);
    setCommentOwnerFirstName(commentOwnerFirstName);
  };

  const postComment = () => {
    const parentCommentData = {
      text: inputValue,
      projectId: projectId,
    };

    axios
      .post(postParentCommentURL, parentCommentData, {
        headers,
      })
      .then((response) => {
        // If dummyComments is not an array, initialize it as an array
        const updatedComments = Array.isArray(dummyComments) ? [...dummyComments] : [];
        updatedComments.push(response.data);
        sendDataToParent(updatedComments);
        setLastCommentIndex(updatedComments.length);
        setInputValue("");
      })
      .catch((error) => {
        // Handle error
      });
  };

  const postSubComment = (commentId) => {
    const subCommentData = {
      text: `@${commentOwnerFirstName} ${subInputValue}`,
      commentId,
    };

    axios
      .post(postSubCommentURL, subCommentData, {
        headers,
      })
      .then((response) => {
        // If dummyComments is not an array, initialize it as an array
        const updatedComments = Array.isArray(dummyComments) ? [...dummyComments] : [];
        updatedComments.push(response.data);
        sendDataToParent(updatedComments);
        setSubInputValue("");
      })
      .catch((error) => {
        // Handle error
      });
  };
  const flagCommentfun = (id, status, placement) => {
    const flagCommentData = {
      commentId: id,
      flag: status,
    };

    axios
      .post(flagComment, flagCommentData, {
        headers,
      })
      .then((response) => {
        if (response.data.message === "Comment is already flagged true") {
          setshowerrortoast(true);
          setTimeout(() => {
            setshowerrortoast(false);
          }, 2000);
        } else if (response.status) {
          sendDataToParent(response.data);
          setLastCommentIndex(dummyComments.length);
          setshowflagtoast(true);
          setTimeout(() => {
            setshowflagtoast(false);
          }, 2000);
          setInputValue("");
        } else {
          setshowerrortoast(true);
          setTimeout(() => {
            setshowerrortoast(false);
          }, 2000);
        }
      })
      .catch((error) => {
      });
  };

  const flagsubCommentfun = (id, status) => {
    const flagsubCommentData = {
      commentId: id,
      flag: status,
    };

    axios
      .post(flagsubComment, flagsubCommentData, {
        headers,
      })
      .then((response) => {
        if (response.data.message === "Comment is already flagged true") {
          setshowerrortoast(true);
          setTimeout(() => {
            setshowerrortoast(false);
          }, 2000);
        } else if (response.status) {
          sendDataToParent(response.data);
          setLastCommentIndex(dummyComments.length);
          setshowflagtoast(true);
          setTimeout(() => {
            setshowflagtoast(false);
          }, 2000);
          setInputValue("");
        } else sendDataToParent(response.data);
        setLastCommentIndex(dummyComments.length);
        setInputValue("");
      })
      .catch((error) => {
      });
  };



  const maxCommentsToShow = 3;
  const showViewAllButton = totalComments > maxCommentsToShow;
  const [viewRepliesForComment, setViewRepliesForComment] = useState({});
  const [showflagtoast, setshowflagtoast] = useState(false);
  const [showerrortoast, setshowerrortoast] = useState(false);

  const toggleRepliesForComment = (commentId) => {
    const comment = dummyComments.find(
      (comment) => comment.commentId === commentId
    );
    if (comment && comment.subComments.length > 0) {
      setViewRepliesForComment((prev) => ({
        ...prev,
        [commentId]: !prev[commentId],
      }));
    }
  };

  const toggleAllReplies = () => {
    const newViewRepliesForComment = {};
    for (const comment of dummyComments) {
      if (comment.subComments.length > 0) {
        newViewRepliesForComment[comment.commentId] = false;
      }
    }
    setViewRepliesForComment(newViewRepliesForComment);
    setViewAllComments(!viewAllComments);
  };

  return (
    <>
      <div className="flex justify-end px-4" onClick={() => setOpen(true)}>
        <span className="font-medium cursor-pointer flex items-center">
          <BiSolidCommentDetail className="mr-2" />
          <span className="font-medium relative bottom-[1px]">Comments</span>
        </span>
      </div>

      <Drawer anchor="bottom" open={open} onClose={toggleDrawer(false)}>
        <div className="wrapperDrawer">
          <Box sx={{ width: "auto" }} role="presentation">
            <div className="px-3 py-4 flex justify-between items-center border border-b-gray-500">
              <div className="commentheading">
                {" "}
                <span className="font-medium text-2xl">
                  Comments ({totalComments})
                </span>
              </div>
              <span className="cursor-pointer" onClick={toggleDrawer(false)}>
                <GrClose className="text-xl" />
              </span>
            </div>
            <div className="px-3">
              {dummyComments
                .slice(
                  0,
                  viewAllComments ? dummyComments.length : maxCommentsToShow
                )
                .map((comment) =>
                  comment.disable ? null : (
                    <div key={comment.commentId} className="drawer">
                      <div className="my-3 border border-gray-100 p-2 bg-slate-50">
                        <h4 className="comment-firstname">
                          {comment.firstName}
                        </h4>
                        <div>
                          <h6>
                            {comment.commentText.split(' ').map((word, index) => (
                              word.startsWith('@') ? (
                                <span key={index} style={{ color: 'green' }}>{word}</span>
                              ) : (
                                <span key={index}>{word}</span>
                              )
                            ))}
                          </h6>

                          <div className="flagreply">
                            <button
                              className="parent-reply"
                              onClick={() =>
                                toggleReplies(
                                  comment.commentId,
                                  comment.firstName
                                )
                              }
                            >
                              Reply
                            </button>
                            <span
                              className="flag"
                              onClick={() =>
                                flagCommentfun(comment.commentId, true)
                              }
                            >
                              <BsFlagFill
                                className="hover:text-red-600"
                                style={{
                                  color: comment.flag ? "red" : "grey",
                                  cursor: "pointer",
                                }}

                              />
                            </span>
                          </div>
                          {comment.subComments.length > 0 &&
                            comment.subComments.filter(
                              (subComment) =>
                                subComment.text !== null &&
                                subComment.disable !== 1
                            ).length > 0 && (
                              <div className="viweallcon">
                                <div className="subline"></div>
                                <button
                                  className="viewallbtn"
                                  onClick={() =>
                                    toggleRepliesForComment(comment.commentId)
                                  }
                                >
                                  {viewRepliesForComment[comment.commentId]
                                    ? "Collapse replies"
                                    : "View all replies"}
                                </button>
                              </div>
                            )}
                          {viewRepliesForComment[comment.commentId] && (
                            <div className="subComment">
                              {comment.subComments.map((subComment) => {
                                if (
                                  subComment.text !== null &&
                                  !subComment.disable
                                ) {
                                  return (
                                    <div
                                      key={subComment.id}
                                      className="sub-comment"
                                    >
                                      <h4 className="comment-firstname">
                                        {subComment.firstName}
                                      </h4>
                            
                                      <h6>
                                        {subComment.text.split(' ').map((word, index) => (
                                          word.startsWith('@') ? (
                                            <span key={index} style={{ color: 'green' , fontSize:"15px" }}>{word}</span>
                                          ) : (
                                            <span key={index} style={{marginLeft:"5px"}}>{word}</span>
                                          )
                                        ))}
                                      </h6>
                                      <div className="flagreply">
                                        <button
                                          className="parent-reply"
                                          onClick={() =>
                                            toggleReplies(
                                              comment.commentId,
                                              subComment.firstName
                                            )
                                          }
                                        >
                                          Reply
                                        </button>
                                        <span
                                          className="flag"
                                          onClick={() =>
                                            flagsubCommentfun(
                                              subComment.id,
                                              true
                                            )
                                          }
                                        >
                                          <BsFlagFill
                                            className="hover:text-red-600"
                                            style={{
                                              color: subComment.flag
                                                ? "red"
                                                : "grey",
                                              cursor: "pointer",
                                            }}
                                          />
                                        </span>
                                      </div>
                                    </div>
                                  );
                                }
                                return null;
                              })}
                            </div>
                          )}
                          {openReplyInput === comment.commentId && (
                            <div className="commt-input">
                              <input
                                className="px-3 py-1 w-full border border-gray-400"
                                placeholder={` reply to ${commentOwnerFirstName}`}
                                onChange={handleSubInputChange}
                                value={subInputValue}
                              />
                              <button
                                id="btnclor"
                                className="border border-gray-400 px-3 py-1 bg-white"
                                onClick={() =>
                                  postSubComment(comment.commentId)
                                }
                              >
                                Comment
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                )}

              {!viewAllComments && showViewAllButton && (
                <div className="viweallcon">
                  <div className="subline"></div>
                  <button
                    className="viewallbtn"
                    onClick={() => toggleAllReplies()}
                  >
                    View all comments
                  </button>
                </div>
              )}
              {viewAllComments && (
                <div className="viweallcon">
                  <div className="subline"></div>
                  <button
                    className="viewallbtn"
                    onClick={() => toggleAllReplies()}
                  >
                    Collapse comments
                  </button>
                </div>
              )}
              {lastCommentIndex !== null && (
                <div className="mynewinput">
                  <input
                    className="px-3 py-1 w-full border border-gray-400"
                    placeholder="Add a comment"
                    onChange={handleInputChange}
                    value={inputValue}
                  />
                  <button
                    id="btnclor"
                    className="border border-gray-400 px-3 py-1 bg-white"
                    onClick={() => postComment()}
                  >
                    comment
                  </button>
                </div>
              )}
            </div>
          </Box>
          {showflagtoast ? (
            <div className="custom-success-message">
              Comment flagged successfully
            </div>
          ) : (
            ""
          )}
          {showerrortoast ? (
            <div className="custom-error-message">Comment already flagged</div>
          ) : (
            ""
          )}
        </div>
      </Drawer>
    </>
  );
};

ProjectComments.propTypes = {
  state: PropTypes.any.isRequired,
  setState: PropTypes.func.isRequired,
  showReplyInput: PropTypes.any.isRequired,
  toggleRepliesnew: PropTypes.func.isRequired,
  dummyComments: PropTypes.array.isRequired, // Make sure it's always an array
  sendDataToParent: PropTypes.func.isRequired,
};

export default ProjectComments;
