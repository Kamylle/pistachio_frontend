import React, { Component } from "react";
import firebase from "../scripts/firebase";
import Textarea from "react-textarea-autosize";
import { accountsRef, cookbooksRef, setPrettifiedCookbookPath } from "../scripts/db";
//import { Link } from 'react-router-dom';

class CreateRecipePage extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      username: props.username,
      recipe: "",
      cookbook: "",
      cookTime: "",
      prepTime: "",
      cookBookID: "123",
      img: "",
      ownerAnecdotes: [
        {
          anecdote: ""
        }
      ],
      ownerNotes: [
        {
          note: ""
          
        }
      ],
      people: {
        authorID: "0",
        creatorID: "1"
      },
      starRating: "4.5",
      yieldNb: "6",
      title: {
        prettifiedPath: "al-and-mon",
        value: "Al & Mon"
      },
      tags: {
        defaultTags: [{ 0: "dessert" }],
        personalTags: [{ 0: "favourite" }]
      },
      ingredients: [
        {
          qty: "",
          unit: "",
          ingr: ""
        }
      ],
      prep: [{ step: "" }]
    };
    this.state = this.initialState;
    this.editRecipe = false;
  }

  componentWillMount = () => {
    this.getCookbooks();
  }

  // componentDidMount() {
    //get localstorage state and set it
    // console.log(this.props.location.state);
    // if (this.props.location.state) {
      // this.setState(this.props.location.state.recipeObject);
    // } else {
    //   // const state = JSON.parse(localStorage.getItem("state"));
    //   this.setState(state);
    // }
  // }

  // setAppState = state => {
  //   this.setState(state, () => {
  //     localStorage.setItem("state", JSON.stringify(this.state));
  //   });
  // };

  writeRecipe = async recipe => {
    const db = firebase.database();
    const selectedCookbook = this.state.cookbook;
    let recipeIDsInCookbook = [];
    // In order to push the new recipe to the selected cookbook, we'll need to
    // get the existing recipes in the cookbook first (as this is the only way
    // we can get firebase to push new things to an array...)
      await db.ref(`Cookbooks/${selectedCookbook}`)
      .child('recipeIDs')
      .once("value", snap => { 
        if (snap.val() !== null) {
          recipeIDsInCookbook.push(...snap.val()); // "= Recipes already in the user's cookbook"
        }
      });
    const recipeKey = this.props.location.state
      ? this.props.location.state.recipeID
      : await db.ref("Recipes/").push().key;
    db.ref(`Recipes/${recipeKey}`).set({ ...recipe, recipeID: recipeKey });
    // Push the new recipeKey into the array of existing recipes (if any) in the selected cookbook :
    recipeIDsInCookbook.push(recipeKey);

    const flattenedRecipeIDs = [].concat.apply([], recipeIDsInCookbook);

    if (!flattenedRecipeIDs.includes(this.state.recipeID)) { // "If user is in edit recipe mode: we won't push the recipe as a new object in firebase"
      const articles = {};
      flattenedRecipeIDs.forEach((article, articleIdx) => {
        return Object.assign(articles, 
              { [articleIdx]: article }
        );
      });
      // Overwrite the existing array ('recipeIDs branch') with the newly updated recipeIDs list :
      db.ref(`Cookbooks/`).child(`${selectedCookbook}/recipeIDs`).set(articles);
    }
  };

  // editRecipe = async (recipe, recipeKey) => {
  //   const db = firebase.database();
  //   await db
  //     .ref(`Recipes/${recipeKey}`)
  //     .set({ ...recipe, recipeID: recipeKey });
  // };

  addImage = async img => {
    // console.log(img)
    const storageRef = firebase.storage().ref("images/" + img.name);
    const snapshot = await storageRef.put(img);
    // console.log('Uploaded a blob or file!', snapshot);
    this.setState({ img: snapshot.downloadURL });
  };

  handleNewCookbookInputChange = event => {
    const target = event.target;
    const value = target.value;

    this.setState({
      newUserCookbookName: value
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleImageInput = event => {
    this.addImage(event.target.files[0]);
  };

  formatArray = arr =>
    arr.reduce((acc, curr, index) => {
      return { ...acc, [index]: curr };
    }, {});

  handleSubmit = async event => {
    event.preventDefault();
    // alert('A recipe was submitted: ' + this.state.recipe);
    const recipe = {
      ...this.state,
      ingredients: this.formatArray(this.state.ingredients),
      prep: this.formatArray(this.state.prep),
      ownerNotes: this.formatArray(this.state.ownerNotes)
    };

    console.log(recipe);
    try {
      // console.log(this.props);
      // if (!this.props.recipeID) {
        await this.writeRecipe(recipe);
      // } else {
      //   await this.editRecipe(recipe, this.props.recipeID);
      // }
      //reset state
      this.setState(this.initialState);
    } catch (err) {
      //console.log(err);
    }
    this.props.history.push("/")
  };

  //dynamic forms from: https://goshakkk.name/array-form-inputs/

  handleIngredientChange = (idx, type) => evt => {
    const newIngredients = this.state.ingredients.map((ingredient, sidx) => {
      if (idx !== sidx) return ingredient;
      else if (type === "qty") return { ...ingredient, qty: evt.target.value };
      else if (type === "unit")
        return { ...ingredient, unit: evt.target.value };
      else if (type === "ingr")
        return { ...ingredient, ingr: evt.target.value };
      else return null;
    });

    this.setState({ ingredients: newIngredients });
  };

  handleAddIngredient = () => {
    this.setState({
      ingredients: this.state.ingredients.concat([
        { qty: "", unit: "", ingr: "" }
      ])
    });
  };

  handleRemoveIngredient = idx => () => {
    this.setState({
      ingredients: this.state.ingredients.filter((s, sidx) => idx !== sidx)
    });
  };

  handleStepChange = idx => evt => {
    const newStep = this.state.prep.map((step, sidx) => {
      if (idx !== sidx) return step;
      else return { ...step, step: evt.target.value };
    });

    this.setState({ prep: newStep });
  };

  handleAddStep = () => {
    this.setState({
      prep: this.state.prep.concat([{ step: "" }])
    });
  };

  handleRemoveStep = idx => () => {
    this.setState({
      prep: this.state.prep.filter((s, sidx) => idx !== sidx)
    });
  };

  handleNoteChange = idx => evt => {
    const newNote = this.state.ownerNotes.map((ownerNotes, sidx) => {
      if (idx !== sidx) return ownerNotes;
      else return { ...ownerNotes, note: evt.target.value };
    });

    this.setState({ ownerNotes: newNote });
  };

  handleAddNote = () => {
    this.setState({
      ownerNotes: this.state.ownerNotes.concat([{ note: "" }])
    });
  };

  handleRemoveNote = idx => () => {
    this.setState({
      ownerNotes: this.state.ownerNotes.filter((s, sidx) => idx !== sidx)
    });
  };

  handleAnecdotesChange = idx => evt => {
    const newAnecdote = this.state.ownerAnecdotes.map((ownerAnecdotes, sidx) => {
      if (idx !== sidx) return ownerAnecdotes;
      else return { ...ownerAnecdotes, anecdote: evt.target.value };
    });

    this.setState({ ownerAnecdotes: newAnecdote });
  };

  handleAddAnecdote = () => {
    this.setState({
      ownerAnecdotes: this.state.ownerAnecdotes.concat([{ anecdote: "" }])
    });
  };

  handleRemoveAnecdote = idx => () => {
    this.setState({
      ownerAnecdotes: this.state.ownerAnecdotes.filter((s, sidx) => idx !== sidx)
    });
  };

  handleNewCookbookAddition = async evt  => {
    evt.preventDefault();
    this.newCookbookInputField.value = ""; // Clears the new cookbook name input field upon submission
    this.setState({ newCookbookAdded: true });

    const db = firebase.database();
    // First, we're creating the cookbook in "Cookbooks"...
    const cookbookKey = await db.ref("Cookbooks/").push().key;
    db.ref(`Cookbooks/${cookbookKey}`)
    .set(
      { ownerUserID: this.props.userID,
        recipeIDs: [],
        title: {
          prettifiedPath: setPrettifiedCookbookPath(cookbookKey),
          value: this.state.newUserCookbookName
        }
      }
    );
    // Then, we're adding the new cookbook into the user's 'cookbooks' list on his/her account...
    const userCookbooks = this.state.cookbookIDs;
    const updatedCookbooksList = userCookbooks.concat(cookbookKey);
    // console.log("UPDATED COOKBOOKS LIST = ", updatedCookbooksList);
    db.ref(`Accounts/${this.props.userID}/cookbooksList`)
    .set(updatedCookbooksList);

    // Finally: Update the state with the updated list of cookbookIDs...
    this.getCookbooks();
  }

  getCookbooks = () => {
    accountsRef
    .child(`${this.props.userID}/cookbooksList`)
    .once('value')
    .then(snap => {
      this.setState({
        cookbookIDs: snap.val(), cookbooksListLoaded: true
      })
      return snap.val() ; // snap.val() = An array of strings representing the user cookbooks' IDs
    })
    .then(async returnedUserCookbookList =>
      await Promise.all(returnedUserCookbookList.map(cookbookID =>
        cookbooksRef
        .child(`${cookbookID}`)
        .once('value')
        .then(snap => snap.val()) // An array of own cookbook object(s) returned from the database.
      ))
    )
    .then((userCookbooks) => {
      this.setState({ userCookbooks, cookbookObjectsloaded: true })
    })
    .catch();
  }

  getSelectableCookbooksList = () => {
    const defaultUnselectableOption = [<option disabled>Select A Cookbook...</option>]
    const newCookbookSelectableOption = <option value="newCookbook">Create New Cookbook...</option>

    try {
      const selectableCookbooks = [];

      if (this.state.cookbookObjectsloaded) {
        this.state.userCookbooks.forEach(cookbook => {
          selectableCookbooks.push(cookbook.title.value)
        });
      }

      const selectOptions = selectableCookbooks.map((cookbookTitle, cbIdx) => {
        // console.log(this.cookbookSelector.options[this.cookbookSelector.selectedIndex]);
          return cbIdx === selectableCookbooks.length - 2 && selectableCookbooks.length > 2
            ? <option selected value={this.state.cookbookIDs[cbIdx]}>{this.state.userCookbooks[cbIdx].title.value}</option>
            : <option value={this.state.cookbookIDs[cbIdx]}>{this.state.userCookbooks[cbIdx].title.value}</option>
      });

      return defaultUnselectableOption
              .concat(selectOptions)
              .concat(newCookbookSelectableOption)

    } catch(err) { 
      //console.log(err);
      return (newCookbookSelectableOption)
    }
  }

  checkForCookbookNameConflict = () => {
    const userCookbookTitles = this.state.userCookbooks.map(cb => {
      return cb.title.value
    });
    userCookbookTitles.push("Create New Cookbook...", ""); // These should not be valid cookbook names...
    const cookbookNameIsValid = userCookbookTitles.every(cbt => cbt.toLowerCase() !== this.state.newUserCookbookName.toLowerCase());
    
    if (!cookbookNameIsValid) {
      return <button disabled>Add Cookbook</button>
    }
    return <button onClick={this.handleNewCookbookAddition}>Add Cookbook</button>
  }

  cancelRecipe = () => {
    // this.setState( this.initialState )
    this.props.history.push("/")
  }

  deleteRecipe = () => {
    // if (window.confirm("Are you sure you wish to delete this item?")) {
      const db = firebase.database();
      db.ref("/Recipes" + this.props.location.state.recipeID).remove();
    // this.props.history.push("/");
    // }
  };

  render() {
    // console.log(this.props.location.state.recipeID);
    return (
      <div id="main" className="flexContain newRecipeContainer">
        <header>
          <h2>New Recipe</h2>
        </header>
        <form onSubmit={this.handleSubmit} className="createRecipe">
          <label className="displayInlineBlock">
            Recipe
            <input
              name="recipe"
              type="text"
              placeholder="Recipe Name"
              value={this.state.recipe}
              onChange={this.handleInputChange}
            />
          </label>


          <label className="displayInlineBlock">
            Cookbook
            <select
              name="cookbook"
              type="text"
              value={this.state.cookbook}
              onChange={this.handleInputChange}
              ref={cbs => this.cookbookSelector = cbs}
            >
              {this.getSelectableCookbooksList()}
            </select>
            {this.state.cookbook === "newCookbook" 
              ? 
                <div>
                  <input 
                    ref={ncbif => this.newCookbookInputField = ncbif} 
                    placeholder="Your new cookbook's name here"
                    onChange={this.handleNewCookbookInputChange}/>
                  <div>{this.checkForCookbookNameConflict()}</div>
                </div> 
              : null}
          </label>

          <h3>Ingredients</h3>
          {this.state.ingredients.map((ingredient, idx) => (
            <div className="ingredient">
              <input
                type="text"
                placeholder={"Quantity"}
                value={ingredient.qty}
                key={idx}
                onChange={this.handleIngredientChange(idx, "qty")}
              />
              <select
                type="text"
                value={ingredient.unit}
                onChange={this.handleIngredientChange(idx, "unit")}
              >
                <option value="unit">Unit</option>
                <option value="cups">cups</option>
                <option value="tbs">tbs</option>
                <option value="tsp">tsp</option>
                <option value="ml">ml</option>
                <option value="g">g</option>
              </select>
              <input
                type="text"
                placeholder={`Ingredient #${idx + 1}`}
                value={ingredient.ingr}
                onChange={this.handleIngredientChange(idx, "ingr")}
              />

              <button
                type="button"
                onClick={this.handleRemoveIngredient(idx)}
                className="small icon close i18"
              >
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={this.handleAddIngredient}
            className="small"
          >
            Add Ingredient
          </button>

          <h3>Preparation</h3>
          {this.state.prep.map((prep, idx) => (
            <div className="step">
              <Textarea
                type="text"
                placeholder={`Step #${idx + 1}`}
                value={prep.step}
                key={idx}
                onChange={this.handleStepChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleRemoveStep(idx)}
                className="small icon close i18"
              >
              </button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddStep} className="small">
            Add Step
          </button>
          
          <label>
            Preparation time
            <input
              name="prepTime"
              type="text"
              placeholder="Estimated preparation time"
              value={this.state.prepTime}
              onChange={this.handleInputChange}
            />
          </label>

          <label>
            Cook time
            <input
              name="cookTime"
              type="text"
              placeholder="Estimated cook time"
              value={this.state.cookTime}
              onChange={this.handleInputChange}
            />
          </label>
          
          <label>
            Number of servings
            <input
              name="yieldNb"
              type="number"
              placeholder="Nb people"
              value={this.state.yieldNb}
              onChange={this.handleInputChange}
            />
          </label>

          <label className="displayInlineBlock">
            Image
            <input
              name="image"
              type="file"
              className="selectImgInput"
              // value={this.state.image}
              onChange={this.handleImageInput}
              // ref={r => this.img = r}
            />
          </label>
          {this.state.img !== "" && (
            <img src={this.state.img} alt="uploaded recipe img" />
          )}

          <h3>Notes</h3>
          {this.state.ownerNotes.map((ownerNotes, idx) => (
            <div className="notes">
              <Textarea
                type="text"
                placeholder={`Note #${idx + 1}`}
                value={ownerNotes.note}
                key={idx}
                onChange={this.handleNoteChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleRemoveNote(idx)}
                className="small icon close i18"
              >
              </button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddNote} className="small">
            Add Note
          </button>

          <h3>Anecdotes</h3>
          {this.state.ownerAnecdotes.map((ownerAnecdotes, idx) => (
            <div className="notes">
              <Textarea
                type="text"
                placeholder={`Anecdotes #${idx + 1}`}
                value={ownerAnecdotes.anecdote}
                key={idx}
                onChange={this.handleAnecdotesChange(idx)}
              />
              <button
                type="button"
                onClick={this.handleRemoveAnecdote(idx)}
                className="small icon close i18"
              >
              </button>
            </div>
          ))}
          <button type="button" onClick={this.handleAddAnecdote} className="small">
            Add anecdote
          </button>

          <div className="bottomBar">
            <button onClick={this.deleteRecipe}>Delete recipe</button>
            <button type="reset" value="Cancel" onClick={this.cancelRecipe}>Cancel</button>     
            <button type="submit" value="Submit">Save</button>
          </div>
        </form>
      </div>
    );
  }
}
export default CreateRecipePage;