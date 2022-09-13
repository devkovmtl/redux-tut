import {
  createSlice,
  nanoid,
  createAsyncThunk,
  createSelector,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import axios from "axios";
import { sub } from "date-fns";
import { apiSlice } from "../api/apiSlice";

const POSTS_URL = `https://jsonplaceholder.typicode.com/posts`;

// const initialState = [
//   {
//     id: "1",
//     title: "Learning Redux Toolkit",
//     content: `I've heard good things.`,
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
//   {
//     id: "2",
//     title: "Slices...",
//     content: "The more I say slice, the more I want pizza.",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: {
//       thumbsUp: 0,
//       wow: 0,
//       heart: 0,
//       rocket: 0,
//       coffee: 0,
//     },
//   },
// ];

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter
  .getInitialState
  //   {
  //   posts: [],
  //   status: "idle", // 'idle' || 'loading' || 'succeeded' || 'failed'
  //   error: null,
  //   count: 0,
  // }
  ();

// export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
//   const response = await axios.get(POSTS_URL);
//   return [...response.data];
// });

// export const addNewPost = createAsyncThunk(
//   "posts/addNewPost",
//   async (initialPost) => {
//     try {
//       const response = await axios.post(POSTS_URL, initialPost);

//       return response.data;
//     } catch (error) {
//       return error.message;
//     }
//   }
// );

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (initialPost) => {
//     try {
//       const { id } = initialPost;

//       const response = await axios.put(`${POSTS_URL}/${id}`, initialPost);
//       return response.data;
//     } catch (error) {
//       return initialPost;
//     }
//   }
// );

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (initialPost) => {
//     const { id } = initialPost;
//     const response = await axios.delete(`${POSTS_URL}/${id}`);
//     if (response?.status === 200) return initialPost;

//     return `${response?.status}: ${response?.statusText}`;
//   }
// );

// const postsSlice = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     postAdded: {
//       reducer(state, action) {
//         state.posts.push(action.payload);
//       },
//       prepare(title, content, userId) {
//         return {
//           payload: {
//             id: nanoid(),
//             title,
//             content,
//             date: new Date().toISOString(),
//             userId,
//             reactions: {
//               thumbsUp: 0,
//               wow: 0,
//               heart: 0,
//               rocket: 0,
//               coffee: 0,
//             },
//           },
//         };
//       },
//     },
//     reactionAdded(state, action) {
//       const { postId, reaction } = action.payload;
//       // const existingPost = state.posts.find((post) => post.id === postId);
//       const existingPost = state.entities[postId];
//       if (existingPost) {
//         existingPost.reactions[reaction]++;
//       }
//     },
//     increaseCount(state, action) {
//       state.count = state.count + 1;
//     },
//   },
//   extraReducers(builder) {
//     builder
//       .addCase(fetchPosts.pending, (state, action) => {
//         state.status = "loading";
//       })
//       .addCase(fetchPosts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         // adding date and reactions
//         let min = 1;
//         const loadedPosts = action.payload.map((post) => {
//           post.data = sub(new Date(), { minutes: min++ }).toISOString();
//           post.reactions = {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0,
//           };
//           return post;
//         });

//         // add any fetched posts to the array
//         // state.posts = state.posts.concat(loadedPosts);
//         postsAdapter.upsertMany(state, loadedPosts);
//       })
//       .addCase(fetchPosts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(addNewPost.fulfilled, (state, action) => {
//         action.payload.userId = Number(action.payload.userId);
//         action.payload.date = new Date().toISOString();
//         action.payload.reactions = {
//           thumbsUp: 0,
//           hooray: 0,
//           heart: 0,
//           rocket: 0,
//         };
//         console.log(action.payload);
//         // state.posts.push(action.payload);
//         postsAdapter.addOne(state, action.payload);
//       })
//       .addCase(updatePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Update could not complete");
//           console.log(action.payload);
//           return;
//         }
//         const { id } = action.payload;
//         action.payload.date = new Date().toISOString();
//         const posts = state.posts.filter((post) => post.id !== id);
//         // state.posts = [...posts, action.payload];
//         postsAdapter.upsertOne(state, action.payload);
//       })
//       .addCase(deletePost.fulfilled, (state, action) => {
//         if (!action.payload?.id) {
//           console.log("Delete could not complete");
//           console.log(action.payload);
//           return;
//         }
//         const { id } = action.payload;
//         const posts = state.posts.filter((post) => post.id !== id);
//         // state.posts = posts;
//         postsAdapter.removeOne(state, id);
//       });
//   },
// });

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        let min = 1;
        const loadedPosts = responseData.map((post) => {
          if (!post?.date)
            post.date = sub(new Date(), { minutes: min++ }).toISOString();
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            };
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) => [
        { type: "Post", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Post", id })),
      ],
    }),
  }),
});

export const { useGetPostsQuery } = extendedApiSlice;

//  returns the query result object
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// create memoizedd selector
const selectPostsData = createSelector(
  selectPostsResult,
  (postsResult) => postsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostByIds,
  // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(
  (state) => selectPostsData(state) ?? initialState
);

// // export const selectAllPosts = (state) => state.posts.posts;
// export const getPostsStatus = (state) => state.posts.status;
// export const getPostsErrror = (state) => state.posts.error;
// export const getCount = (state) => state.posts.count;

// // export const selectPostById = (state, postId) =>
// //   state.posts.posts.find((post) => post.id === postId);

// export const selectPostsByUser = createSelector(
//   // input
//   [selectAllPosts, (state, userId) => userId],
//   // output
//   (posts, userId) => posts.filter((post) => post.userId === userId)
// );

// export const { postAdded, reactionAdded, increaseCount } = postsSlice.actions;

// export default postsSlice.reducer;
