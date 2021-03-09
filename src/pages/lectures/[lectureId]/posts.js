import React, { useEffect } from "react";
import { END } from "redux-saga";
import { useDispatch } from "react-redux";
import Store from "@redux/Store";
import Banner from "@components/Banner";
import PostEditButtonContainer from "@components/posts/write/PostEditButtonContainer";
import PostListContainer from "@components/posts/read/PostListContainer";
import { initialize, fetchPosts } from "@redux/sagas/PostSaga";
import { setSSRCookies } from "@src/axios";

function posts({ title }) {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // 나갈 때 데이터 전부 지우기
      dispatch(initialize());
    };
  }, [dispatch]);

  return (
    <>
      {/* 강의 제목 보여주는 배너 */}
      <Banner text={title} />

      {/* 포스트 생성 버튼 */}
      <PostEditButtonContainer />

      {/* 포스트 목록 */}
      <PostListContainer />
    </>
  );
}

export const getServerSideProps = Store.getServerSideProps(async (context) => {
  const { lectureId } = context.params;

  // 쿠키 설정
  setSSRCookies(context);

  // 강의의 포스트들과 강의 정보 전부 불러오기
  context.store.dispatch(fetchPosts(lectureId));
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();

  // 강의 정보가 없을경우 404 반환
  const state = context.store.getState();
  if (!state.post.lectureInfo) {
    return { notFound: true };
  }

  return { props: { title: state.post.lectureInfo.title } };
});

export default React.memo(posts);
