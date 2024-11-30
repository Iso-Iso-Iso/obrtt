# Test Task

Hi! I'm glad to try myself in this taks. Here you can find installation, notes for reviewer, my opition about task.

## Installation

First of all, you need to [install Node.js](https://nodejs.org/en/download/package-manager) if you haven’t done that already.

Then install packages.

```bash
npm i --force # I'm using latest Next.js version so --force required. See Notes for Reviewer below.
```
Then start as usual next app.

Start for dev:

```bash
npm run dev
```

Build for prod:
```bash
npm run build && npm run start
```

## Usage

Open web browser and navigate to first questionnaire page

```bash
http://localhost:3000/questionnaires/test-name/question/1
```

## Notes for reviewer (Known issues)

Due to a lack of time, I didn’t fix some issues. However, I want to share my future plans.

- Latest Next.js. I've used the latest version of next which has some peer dependency issues because of React version 19. For production we should downgrade version.

- Searching approach inside config. I've used arrays as storage of questions/questionnaires but with big amount of data it can cause some performance issues. Under the hood I'm using include and find (because it's a common way to send response from server), but we can re-write structure for better performance using objects with ids. For example {1:Question, 2: Question} and change find complexity from N to const.

- Bad styles. I did't style 404 page and index page. Also, for result page I just display content as title and paragraph.

- Alert page depend on previous answer and direct opening can cause unavailability in navigation.

## My opinion about task

Thanks. It was an interesting challenge. But I believe we can improve it in some cases.

- getStaticPaths and generateStaticParams are available only in legacy page router. Next recommended to use new app router to handle navigation.

- Question invariants. Some question has strange navigation logic.
