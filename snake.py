from tkinter import *

screen = Tk()
canvas = Canvas(screen,width=100, height=100)
canvas.pack()
oneline = canvas.create_line(0,0,50,50)
twoline = canvas.create_line(0,0,24,50,fill="red")
canvas.delete(oneline)
screen.mainloop()
