-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "label" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PollAnswer" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "poll" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PollAnswer_answeredByUsers_User_pollAnswers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "PollAnswer.poll_index" ON "PollAnswer"("poll");

-- CreateIndex
CREATE UNIQUE INDEX "_PollAnswer_answeredByUsers_User_pollAnswers_AB_unique" ON "_PollAnswer_answeredByUsers_User_pollAnswers"("A", "B");

-- CreateIndex
CREATE INDEX "_PollAnswer_answeredByUsers_User_pollAnswers_B_index" ON "_PollAnswer_answeredByUsers_User_pollAnswers"("B");

-- AddForeignKey
ALTER TABLE "PollAnswer" ADD FOREIGN KEY ("poll") REFERENCES "Poll"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PollAnswer_answeredByUsers_User_pollAnswers" ADD FOREIGN KEY ("A") REFERENCES "PollAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PollAnswer_answeredByUsers_User_pollAnswers" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
