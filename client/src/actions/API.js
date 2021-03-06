// Imports
import axios from "axios";

// ---------------------------------------------------------------
export default {
  // Gets all kids
  retrieveChildren: function(id) {
    return axios.get("/api/retrieveChildren/" + id);
  },

  //Delete a child 
  removeChild: function(id) {
    return axios.delete("/api/children/" + id);
  },

  //Create a sport
  addSport: function(sport) {
    const data = {
      name: sport
    }
    return axios.post("/api/postsport", data);
  },

  getSports: function() {
    return axios.get("/api/getsport");
  },

  createTeam: function(teamData) {
    return axios.post("/api/teams", teamData);
  },

  findKids: function(sportId) {
    return axios.get("/api/assignChildren/" + sportId);
  },

  findCoaches: function(sportId) {
    return axios.get("/api/assignCoach/" + sportId);
  },

  findTeams: function(sportId) {
    return axios.get("/api/findteams/" + sportId);
  },

  coachFindTeams: function(id) {
    return axios.get(`/api/coachFindTeams/${id}`);
  },

  createNewGame: function(gameData) {
    return axios.post("/api/createGame/", gameData);
  },

  getGame: function() {
    return axios.get("/api/getGame");
  },

  assignPlayer: function(data) {
    return axios.put("/api/children", data);
  },

  assignCoach: function(data) {
    return axios.put("/api/coach", data);
  },

  retrieveKidInfo: function(kidId) {
    return axios.get("/api/kidInfo/" + kidId);
  },

  findSchedules: function(teamId) {
    return axios.get(`/api/findSchedules/${teamId}`)
  },
  
  childPaid: function (paidInfo) {
    return axios.put("/api/paid", paidInfo)
  }
}