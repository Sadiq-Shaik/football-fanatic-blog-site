import { useReducer, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import ArticleContext from "./blog-article-context";

import "../util/firebase";

import { getDatabase, ref, get, child, update, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

const defaultArticleState = [
  {
    id: "",
    images: [],
    title: "",
    articleText: "",
    author: "",
    date: "",
    hits: 0,
    likes: 0,
    comments: [],
  },
];

const articleReducer = (state, action) => {
  // if (action.type === "ADD") {
  //   console.log("add article to DB");
  // }

  // if (action.type === "REMOVE") {
  //   console.log("Remove article from db");
  // }

  if (action.type === "POPULATE") {
    // console.log(action.payload);
    return action.payload;
  }

  if (action.type === "ADD_COMMENT") {
    // console.log(action.payload);

    const { article_id, data } = action.payload;

    // function sendCommentData(postId, data) {
    //   const db = getDatabase();

    //   // A post entry.
    //   // const postData = {
    //   //   likes: likes,
    //   // };

    //   // Get a key for a new Post.
    //   // const newPostKey = push(child(ref(db), "posts")).key;

    //   console.log(postId);

    //   // Write the new post's data simultaneously in the posts list and the user's post list.
    //   const updates = {};
    //   // updates["/posts/" + newPostKey] = postData;
    //   updates[`/blogposts/${postId}/comments`] = data;

    //   return update(ref(db), updates);
    // }

    // sendCommentData(article_id, data);

    // console.log(state);

    // // return state;

    ///////////////////////////////////
    const theArticle = state.find((article) => {
      return article.id === article_id;
    });

    // console.log(theArticle);

    theArticle.comments = data;

    // console.log(theArticle);
    const newState = state.map(
      (obj) => [theArticle].find((o) => o.id === obj.id) || obj
    );
    return newState;

    // return state;
  }
};

const ArticleProvider = (props) => {
  const [articleState, dispatchAction] = useReducer(
    articleReducer,
    defaultArticleState
    // artArray
  );

  // const navigate = useNavigate();
  const navigate = useNavigate();

  useEffect(() => {
    let articles;
    // console.log(" Effect");
    const getArticlesFromDB = async () => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `blogposts/`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            // console.log(snapshot.val());
            articles = snapshot.val();

            const artKeys = Object.keys(articles);
            const artVals = Object.values(articles);

            // console.log(artKeys, artVals);

            let artArray = [];

            for (let i = 0; i < artKeys.length; i++) {
              artArray[i] = {
                id: artKeys[i],
                ...artVals[i],
              };
            }

            // console.log(artArray);

            dispatchAction({ type: "POPULATE", payload: artArray });

            // return artArray;
          } else {
            console.error("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getArticlesFromDB();
  }, []);

  // let articles;

  // const getArticlesFromDB = async () => {
  //   const dbRef = ref(getDatabase());
  //   get(child(dbRef, `blogposts/`))
  //     .then((snapshot) => {
  //       if (snapshot.exists()) {
  //         console.log(snapshot.val());
  //         articles = snapshot.val();

  //         const artKeys = Object.keys(articles);
  //         const artVals = Object.values(articles);

  //         console.log(artKeys, artVals);

  //         let artArray = [];

  //         for (let i = 0; i < artKeys.length; i++) {
  //           artArray[i] = {
  //             id: artKeys[i],
  //             ...artVals[i],
  //           };
  //         }

  //         console.log(artArray);

  //         dispatchAction({ type: "POPULATE", payload: artArray });

  //         // return artArray;
  //       } else {
  //         console.log("No data available");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // getArticlesFromDB();

  // const artKeys = Object.keys(articles);
  // const artVals = Object.values(articles);

  // console.log(artKeys, artVals);

  // let artArray = [];

  // for (let i = 0; i < artKeys.length; i++) {
  //   artArray[i] = {
  //     id: artKeys[i],
  //     ...artVals[i],
  //   };
  // }

  // // return artArray;

  // console.log(artArray);
  // populateArticlesHandler(artArray);

  ////////////////////////////////////////////////////////
  // const [isFetching, setIsFetching] = useState(true);
  // const articlesCtx = useContext(ArticleContext);
  //////////////////////////////////////////////////////////

  const addArticleHandler = (art) => {
    // add artilce to db using dispatch action

    // console.log(art);

    let newPostKey;

    function writeNewPost(articleData) {
      const fireDB = getDatabase();

      const postData = {
        title: articleData.title,
        images: articleData.images,
        articleText: articleData.articleText,
        author: articleData.author,
        date: articleData.date,
        hits: articleData.hits,
        likes: articleData.likes,
        comments: articleData.comments,
      };

      // Get a key for a new Post.
      newPostKey = push(child(ref(fireDB), "blogposts")).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates["/blogposts/" + newPostKey] = postData;

      return update(ref(fireDB), updates);
    }

    const res = writeNewPost(art);

    console.log(res);

    res.then(() => {
      navigate(`/article/${newPostKey}`);
      navigate(0);
    });
  };

  const removeArticleHandler = (art) => {
    // delete article from  using dispatch action
  };

  const hitsIncrementHandler = (art) => {
    //
    console.log(art.id);

    function sendAHit(postId, data) {
      const db = getDatabase();

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      // updates["/posts/" + newPostKey] = postData;
      updates[`/blogposts/${postId}/hits`] = data;

      return update(ref(db), updates);
    }

    const res = sendAHit(art.id, art.hits++);

    res.then(() => {
      console.log("Hits sent");
    });
  };

  // const populateArticlesHandler = (data) => {
  //   // add fetched articles to state

  //   // console.log(data);
  //   dispatchAction({ type: "POPULATE", payload: data });
  // };

  const addCommentHandler = (commentData) => {
    // add a comment to DB

    console.log(commentData);

    // dispatchAction({ type: "ADD_COMMENT", payload: data });

    ///////////////////////////////////////////////////////////////

    const { article_id, data } = commentData;

    function sendCommentData(postId, data) {
      const db = getDatabase();

      console.log(postId);

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      // updates["/posts/" + newPostKey] = postData;
      updates[`/blogposts/${postId}/comments`] = data;

      return update(ref(db), updates);
    }

    const res = sendCommentData(article_id, data);

    res.then(() => {
      dispatchAction({ type: "ADD_COMMENT", payload: commentData });
    });

    // to refresh page
    // const refreshPage = () => {
    //   navigate(0);
    // };

    // refreshPage();
    /////////////////////////
  };

  // useEffect(() => {
  //   const fetchArticles = async function () {
  //     const response = await fetch(
  //       "https://football-fanatic-default-rtdb.asia-southeast1.firebasedatabase.app/articles.json"
  //     );

  //     const data = await response.json();
  //     // console.log(data);
  //     populateArticlesHandler(data);
  //   };

  //   fetchArticles();
  // }, []);

  // function writeUserData(userId, name, email, imageUrl) {
  //   const db = getDatabase();

  //   const reference = ref(db, "users/" + userId);

  //   set(reference, {
  //     username: name,
  //     email: email,
  //     profPic: imageUrl,
  //   });
  // }

  // writeUserData("sssId", "Sadiq Shaik", "asdhgajks@gmail.com", "myurl");

  const articleContext = {
    articles: articleState,
    addArticle: addArticleHandler,
    removeArticle: removeArticleHandler,
    // populateArticles: populateArticlesHandler,
    addComment: addCommentHandler,
    addHits: hitsIncrementHandler,
  };

  return (
    <ArticleContext.Provider value={articleContext}>
      {props.children}
    </ArticleContext.Provider>
  );
};

export default ArticleProvider;

////////////////////////////////////////////////////////////////////////////////////////////
// const articles = {
//   "-N7VoiITKDQmENE-t7Fo": {
//     articleText:
//       "It all started with the computer. Had he known what was to follow, he would have never logged on that day. But the truth was there was no way to know what was about to happen. So Dave pressed the start button, the computer booted up, the screen came alive, and everything Dave knew to be true no longer was.[EOP]It had been a simple realization that had changed Debra's life perspective. It was really so simple that she was embarrassed that she had lived the previous five years with the way she measured her worth. Now that she saw what she had been doing, she could see how sad it was. That made her all the more relieved she had made the change. The number of hearts her Instagram posts received wasn't any longer the indication of her own self-worth.[EOP]The boxed moved. That was a problem. Peter had packed the box three hours before and there was nothing inside that should make it move. The question now was whether or not Peter was going to open it up and look inside to see why it had moved. The answer to that question was obvious. Peter dropped the package into the mailbox so he would never have to see it again.[EOP]Sometimes it just doesn't make sense. The man walking down the street in a banana suit. The llama standing in the middle of the road. The fairies dancing in front of the car window. The fact that all of this was actually happening and wasn't a dream.[EOP]Wandering down the path to the pond had become a daily routine. Even when the weather wasn't cooperating like today with the wind and rain, Jerry still took the morning stroll down the path until he reached the pond. Although there didn't seem to be a particular reason Jerry did this to anyone looking in from the outside, those who knew him well knew exactly what was going on. It could all be traced back to a specific incident that happened exactly 5 years previously.\n      ",
//     author: "Sam",
//     comments: [
//       {
//         message: "Hala Madrid",
//         name: "sam",
//       },
//       {
//         message: "Y da Na Mas",
//         name: "sam",
//       },
//       {
//         message: "Great post 3",
//         name: "sam",
//       },
//       {
//         message: "Great post 4",
//         name: "sam",
//       },
//     ],
//     date: "24 June, 2021",
//     hits: 55,
//     images: [
//       "https://images.unsplash.com/photo-1522778034537-20a2486be803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     likes: 35,
//     title: "Champions of Europe! Real Madrid win the UCL 2021-2022 season",
//   },
//   "-N7ZRGuS7v0LMHTi0q7M": {
//     articleText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.\n\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.\n\n      Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.\n\n      Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.",
//     author: "Sam",
//     comments: [
//       {
//         message: "Great post 1",
//         name: "sam",
//       },
//       {
//         message: "Great post 2",
//         name: "sam",
//       },
//       {
//         message: "Great post 3",
//         name: "sam",
//       },
//       {
//         message: "Great post 4",
//         name: "sam",
//       },
//     ],
//     date: "24 June, 2021",
//     hits: 5,
//     images: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     likes: 10,
//     title: "an example title 1",
//   },
//   "-N7ZRGuVnemw84Lx27yL": {
//     articleText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.\n\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.\n\n      Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.\n\n      Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.",
//     author: "Sam",
//     comments: [
//       {
//         message: "Great post 1",
//         name: "sam",
//       },
//       {
//         message: "Great post 2",
//         name: "sam",
//       },
//       {
//         message: "Great post 3",
//         name: "sam",
//       },
//       {
//         message: "Great post 4",
//         name: "sam",
//       },
//     ],
//     date: "27 June, 2021",
//     hits: 6,
//     images: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     likes: 10,
//     title: "an example title 2",
//   },
//   "-N7ZRGuWAI_D-0BVF9mu": {
//     articleText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.\n\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.\n\n      Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.\n\n      Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.",
//     author: "Sam",
//     comments: [
//       {
//         message: "Great post 1",
//         name: "sam",
//       },
//       {
//         message: "Great post 2",
//         name: "sam",
//       },
//       {
//         message: "Great post 3",
//         name: "sam",
//       },
//       {
//         message: "Great post 4",
//         name: "sam",
//       },
//     ],
//     date: "28 June, 2021",
//     hits: 7,
//     images: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     likes: 10,
//     title: "an example title 3",
//   },
//   "-N7ZRGuX5kI5dl9IoRyT": {
//     articleText:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.\n\n      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.\n\n      Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.\n\n      Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.",
//     author: "Sam",
//     comments: [
//       {
//         message: "Great post 1",
//         name: "sam",
//       },
//       {
//         message: "Great post 2",
//         name: "sam",
//       },
//       {
//         message: "Great post 3",
//         name: "sam",
//       },
//       {
//         message: "Great post 4",
//         name: "sam",
//       },
//     ],
//     date: "29 June, 2021",
//     hits: 9,
//     images: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     likes: 10,
//     title: "an example title 4",
//   },
// };

// console.log(artArray);

// const articles = [
//   {
//     id: 1,
//     imgs: [
//       "https://images.unsplash.com/photo-1522778034537-20a2486be803?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     title: "Champions of Europe!  Real Madrid win the UCL 2021-2022 season",
//     articleText: `It all started with the computer. Had he known what was to follow, he would have never logged on that day. But the truth was there was no way to know what was about to happen. So Dave pressed the start button, the computer booted up, the screen came alive, and everything Dave knew to be true no longer was.[EOP]It had been a simple realization that had changed Debra's life perspective. It was really so simple that she was embarrassed that she had lived the previous five years with the way she measured her worth. Now that she saw what she had been doing, she could see how sad it was. That made her all the more relieved she had made the change. The number of hearts her Instagram posts received wasn't any longer the indication of her own self-worth.[EOP]The boxed moved. That was a problem. Peter had packed the box three hours before and there was nothing inside that should make it move. The question now was whether or not Peter was going to open it up and look inside to see why it had moved. The answer to that question was obvious. Peter dropped the package into the mailbox so he would never have to see it again.[EOP]Sometimes it just doesn't make sense. The man walking down the street in a banana suit. The llama standing in the middle of the road. The fairies dancing in front of the car window. The fact that all of this was actually happening and wasn't a dream.[EOP]Wandering down the path to the pond had become a daily routine. Even when the weather wasn't cooperating like today with the wind and rain, Jerry still took the morning stroll down the path until he reached the pond. Although there didn't seem to be a particular reason Jerry did this to anyone looking in from the outside, those who knew him well knew exactly what was going on. It could all be traced back to a specific incident that happened exactly 5 years previously.
//       `,
//     author: "Sam",
//     date: "24 June, 2021",
//     hits: 15,
//     likes: 10,
//     comments: [
//       { name: "sam", message: "Hala Madrid" },
//       { name: "sam", message: "Y da Na Mas" },
//       { name: "sam", message: "Great post 3" },
//       { name: "sam", message: "Great post 4" },
//     ],
//   },
//   {
//     id: 12,
//     imgs: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     title: "an example title",
//     articleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.

//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.

//       Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.

//       Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.`,
//     author: "Sam",
//     date: "24 June, 2021",
//     hits: 5,
//     likes: 10,
//     comments: [
//       { name: "sam", message: "Great post 1" },
//       { name: "sam", message: "Great post 2" },
//       { name: "sam", message: "Great post 3" },
//       { name: "sam", message: "Great post 4" },
//     ],
//   },
//   {
//     id: 3,
//     imgs: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     title: "an example title",
//     articleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a. [EOP]

//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.
//       [EOP]
//       Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.
//       [EOP]
//       Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.`,
//     author: "Sam",
//     date: "24 June, 2021",
//     hits: 2,
//     likes: 10,
//     comments: [
//       { name: "sam", message: "Great post 1" },
//       { name: "sam", message: "Great post 2" },
//       { name: "sam", message: "Great post 3" },
//       { name: "sam", message: "Great post 4" },
//     ],
//   },
//   {
//     id: 4,
//     imgs: [
//       "https://upload.wikimedia.org/wikipedia/commons/2/22/Hagia_Sophia_Mars_2013.jpg",
//     ],
//     title: "An example title",
//     articleText: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc mauris, pharetra quis nunc in, tristique lacinia elit. Phasellus sit amet nunc vestibulum nunc tincidunt iaculis in sed ex. Praesent metus eros, faucibus et dignissim a, auctor et ipsum. Nulla non ex scelerisque dui volutpat accumsan quis sed lacus. Donec sit amet dui et dolor hendrerit varius eget non nisi. In ut orci ipsum. Suspendisse nec mauris in sapien bibendum lacinia. Curabitur tempor id quam non efficitur. Integer fermentum urna eget libero placerat, eu ullamcorper ligula suscipit. Ut porta finibus lacus, a luctus dolor ultricies ut. Nullam eleifend elit enim, a tincidunt metus laoreet a.

//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor rhoncus pretium. Nullam tristique, turpis nec facilisis maximus, lectus felis aliquet urna, quis consectetur metus enim eget velit. Mauris enim massa, lacinia et pretium ut, congue et erat. Nunc quam lorem, facilisis id semper vel, lacinia non nisi. Duis iaculis congue massa. Aliquam sed ipsum pellentesque, bibendum erat eget, pharetra ipsum. Pellentesque dignissim viverra mi vel sollicitudin. In vestibulum et orci ut posuere. Vestibulum dapibus mi eu neque varius, nec congue velit luctus.

//       Ut suscipit lectus nibh, vel varius nisl porttitor sed. Ut mauris libero, tincidunt in egestas sed, mollis id eros. Suspendisse vestibulum rutrum eros eu venenatis. Vivamus vitae facilisis tellus. Curabitur augue metus, cursus bibendum ex et, suscipit aliquet nisl. Nunc id consectetur nisi. Duis eros tellus, tempor sed semper id, posuere laoreet nibh. Morbi eleifend aliquet auctor. Vivamus leo nibh, imperdiet gravida condimentum eu, varius nec nisl. Pellentesque eu nisi at neque luctus aliquam. Aliquam et posuere dolor, et pretium quam. Morbi imperdiet molestie eros, sed facilisis ante efficitur eget. Aenean pharetra maximus sodales. Maecenas scelerisque ante nec dui lacinia, at fermentum ex eleifend. Cras id convallis mi, ac mattis orci.

//       Aenean sed dignissim sem. Pellentesque justo dui, egestas non velit et, auctor molestie arcu. Duis ornare felis massa, vel euismod urna porttitor vitae. Proin fermentum sagittis ipsum id placerat. Donec ipsum sapien, pretium non ultricies id, accumsan at tellus. Sed vel est consectetur, faucibus nibh eget, volutpat magna. Curabitur porttitor laoreet blandit. In sagittis turpis felis, at rhoncus lorem dapibus sit amet. Sed pellentesque leo ac imperdiet consectetur. Mauris bibendum nibh eu nisl ultricies, in auctor mauris dignissim. Aenean tincidunt varius lobortis. Ut auctor non erat vel imperdiet.`,
//     author: "Sam",
//     date: "24 June, 2021",
//     hits: 1,
//     likes: 10,
//     comments: [
//       { name: "sam", message: "Great post 1" },
//       { name: "sam", message: "Great post 2" },
//       { name: "sam", message: "Great post 3" },
//       { name: "sam", message: "Great post 4" },
//     ],
//   },
// ];
