#!/usr/bin/python
#-*- coding: iso-8859-1 -*-

import cgi, cgitb, sys, json

cgitb.enable()

print "Content-type: text/html"
print

form = cgi.FieldStorage()
filename = "tulemused.txt"

def save(result):
	resultsFile = open(filename,"a")
	resultsFile.write(result + "\n")
	resultsFile.close()

def load(sortBy):
	f = open(filename, "r")
	lines = f.read()
	f.close
	return makeToObjectsAndSort(lines,sortBy)

def makeToObjectsAndSort(lines,sortBy):
	resultItems = []
	correctOrder = ""
	linesArray = lines.split("\n")
	for line in linesArray:
		parameters = line.split(" ")
		if(parameters[0] != ""):
			resultItems.append(resultItem(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4]))

	if sortBy == '1' or sortBy == '2':
		resultItems.sort(key=lambda x: x.gameDate, reverse=True)
	elif (sortBy == '3'):
		resultItems.sort(key=lambda x: x.playerName, reverse=False)
	elif (sortBy == '4'):
		resultItems.sort(key=lambda x: int(x.myShipsDestroyed), reverse=True)
	elif (sortBy == '5'):
		resultItems.sort(key=lambda x: int(x.compShipsDestroyed), reverse=True)
	elif (sortBy == '7'):
		resultItems.sort(key=lambda x: x.gameDate, reverse=False)
	elif (sortBy == '8'):
		resultItems.sort(key=lambda x: x.playerName, reverse=True)
	elif (sortBy == '9'):
		resultItems.sort(key=lambda x: int(x.myShipsDestroyed), reverse=False)
	elif (sortBy == '10'):
		resultItems.sort(key=lambda x: int(x.compShipsDestroyed), reverse=False)
	elif (sortBy =='11'):
		resultItems.sort(key=lambda x: float(x.gameTime), reverse=False)
	else:
		resultItems.sort(key=lambda x: float(x.gameTime), reverse=True)

	for result in resultItems:
		correctOrder += str(result.getResultItem()) + "\n"

	return correctOrder

def search(playerToSearch):

	f = open(filename, "r")
	lines = f.read()
	f.close

	correctOrder = ""
	resultItems = []
	linesArray = lines.split("\n")

	for line in linesArray:
		parameters = line.split(" ")
		if(parameters[0] != "" and parameters[1].lower() == playerToSearch.lower()):
			resultItems.append(resultItem(parameters[0],parameters[1],parameters[2],parameters[3],parameters[4]))

	for result in resultItems:
		correctOrder += str(result.getResultItem()) + "\n"

	return correctOrder.strip()

class resultItem():

	def __init__(self, gameDate, playerName, myShipsDestroyed, compShipsDestroyed, gameTime):
		self.gameDate = gameDate
		self.playerName = playerName
		self.myShipsDestroyed = myShipsDestroyed
		self.compShipsDestroyed = compShipsDestroyed
		self.gameTime = gameTime

	def getResultItem(self):
		returnString = self.gameDate + " " +self.playerName + " " + str(self.myShipsDestroyed) + " " + str(self.compShipsDestroyed) + " " + str(self.gameTime) + "s"
		return returnString

if form.has_key("save"):
	save(form['save'].value)
elif form.has_key("search"):
	print search(form['search'].value)
else:
	print load(form['load'].value)

