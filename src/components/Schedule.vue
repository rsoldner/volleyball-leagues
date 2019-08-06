<template>
    <div class="schedule container">
        <h2>Schedule</h2>
        <div class="row">

          <b-col cols="4">
            <b-form inline @submit.prevent='fetchSchedule()'>
              <b-input
                align-h="end"
                id='input-search-team'
                v-model='search_team'
                type='text'
                required
                placeholder='Team name to search for'
              ></b-input>
              <!-- TODO use Datalist -->
              <b-button
                v-if="!search_loading"
                type='submit'
                align-h='end'
                variant='info'
                >Search</b-button>
              <b-spinner v-else variant="info" label="Spinning"></b-spinner>
            </b-form>
          </b-col>
          <b-col cols="8">
            <div class="d-flex justify-content-end">
              <b-button class="padding-left" :pressed="displayAll" @click="displayAll=true" variant="info">All</b-button>
              <b-button class="padding-left" :pressed="!displayAll" @click="displayAll=false" variant="info">Upcoming</b-button>
            </div>
          </b-col>
        </div>
        <div class="table-padding row">
          <div class="center" v-if="games.length==0"><b-spinner></b-spinner></div>
          <b-table
            v-else
            striped
            hover
            :fields="fields"
            :tbody-tr-class="gamesInPast"
            :items="gamesToDisplay"></b-table>
        </div>
    </div>
</template>

<script>
import db from '@/firebase/init'
import moment from 'moment'

export default {
  name: 'Schedule',
  data() {
    return {
      fields: [
        {
          key: 'date'
        },
        {
          key: 'court'
        },
        {
          key: 'team1',
          tdClass: 'myTeam'
        },
        {
          key: 'team2',
          tdClass: 'myTeam'
        },

      ],
      displayAll: true,
      games: [],
      search_loading: false,
      search_team: null
    }
  },
  created() {
    this.fetchSchedule()
  },
  computed: {
    gamesToDisplay() {
      if (this.displayAll) {
        return this.games
      }
      let newArr = this.games.filter((item) => {
        if (moment().isBefore(moment.unix(item.timestamp).format('llll'))) {
          return true
        }
        return false
      })
      return newArr
    }
  },
  methods: {
    fetchSchedule() {
      // Reset games array when fetching the schedule
      this.games = []
      if (this.search_team) {
        db.collection('schedule')
          .where('team1', '==', this.search_team)
          .orderBy('timestamp').get()
          .then((games) => {
            this.storeGames(games)
          })
        db.collection('schedule')
          .where('team2', '==', this.search_team)
          .orderBy('timestamp').get()
          .then((games) => {
            this.storeGames(games)
          })
      } else {
        db.collection('schedule')
          .orderBy('timestamp')
          .get()
          .then((g) => {
            this.storeGames(g)
          })
      }
    },

    storeGames(gamesArr) {
      gamesArr.docs.forEach((game) => {
        let gameData = game.data()
        gameData.date = moment.unix(gameData.timestamp).format('lll')
        gameData.id = game.id
        this.games.push(gameData)
      })
    },

    gamesInPast(item, type) {
      if (!item) return
      // timestamp: moment(doc.data().timestamp).format('lll'),
      if (moment().isAfter(moment.unix(item.timestamp).format('llll'))) {
        return 'table-row-strikethrough'
      }
    },

    myTeam(item, type) {
      if (!item) return
      if (!this.search_team) return

      console.log(item)
      if (item == this.search_team) {
        return 'bg-info'
      }
      return ''
    }
  }
}
</script>

<style>
.table-padding {
  margin-top: 15px;
}
.table-row-strikethrough {
  text-decoration: line-through;
}
</style>
