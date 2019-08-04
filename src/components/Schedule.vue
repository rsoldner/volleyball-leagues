<template>
    <div class="schedule container">
        <h2>Schedule</h2>
        <div class="row">

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
        </div>
        <div class="table-padding row">
          <div class="center" v-if="games.length==0"><b-spinner></b-spinner></div>
          <b-table
            v-else
            striped
            hover
            :fields="fields"
            :tbody-tr-class="gamesInPast"
            :items="games"></b-table>
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
          key: 'time'
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
      games: [],
      search_loading: false,
      search_team: null
    }
  },
  created() {
    this.fetchSchedule()
  },
  methods: {
    fetchSchedule() {
      // Reset games array when fetching the schedule
      this.games = []
      if (this.search_team) {
        db.collection('schedule')
          .where('team1', '==', this.search_team)
          .orderBy('date').get()
          .then((games) => {
            games.docs.forEach((game) => {
              this.games.push(game.data())
            })
          })
        db.collection('schedule')
          .where('team2', '==', this.search_team)
          .orderBy('date').get()
          .then((games) => {
            games.docs.forEach((game) => {
              this.games.push(game.data())
            })
          })
      } else {
        db.collection('schedule')
          .orderBy('date')
          .get()
          .then((games) => {
            games.docs.forEach((game) => {
              this.games.push(game.data())
            })
          })
      }
    },

    gamesInPast(item, type) {
      if (!item) return
      // timestamp: moment(doc.data().timestamp).format('lll'),
      if (moment().isAfter(moment(item.date).format('M/D/YYYY'))) {
        return 'table-row-strikethrough'
      }
    },

    myTeam(item, type) {
      if (!item) return
      if (!this.search_team) return
      console.log(item)
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
