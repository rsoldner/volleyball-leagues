
import csv;

teamName = 'Soldner'

teamData = [ ["Start Date", "Start Time", "Subject", "Description"] ]

with open('/mnt/c/Users/zinge/Downloads/Gators_2019.csv') as csvfile:
    day = ''
    time = ''
    spamreader = csv.reader(csvfile);
    for row in spamreader:
        if( row[1] != '' ):
            day = row[1]

        if( teamName in row ):
            game = []
            index = row.index(teamName)
            game.append(day)
            game.append(row[2])

            if( index == 4 ):
                opponent = row[5]
            elif (index == 5 ):
                opponent = row[4]
            elif (index == 8):
                opponent = row[9]
            elif (index == 9):
                opponent = row[8]
            game.append( "Gators Volleyball vs " + opponent)

            # Column 4 or 5  or 8 or 9
            if( index == 4 or index == 5 ):
                game.append( "Court 1" )
            else:
                game.append( "Court 2" )

            #print(', '.join(game))
            teamData.append(game)



for game in teamData:
    print(", ".join(game))
