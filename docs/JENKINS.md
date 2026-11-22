# Jenkins Pipeline Setup

## Required plugins

- Git
- Docker
- Allure

## Job setup

1. Create a new **Pipeline** job in Jenkins.
2. In **Pipeline**, select `Pipeline script from SCM`.
3. Set SCM to Git and enter the GitHub repository URL for `adactin-playwright-automation`.
4. Set the script path to `PlaywrightAutomation/Jenkinsfile` if the Jenkins job root is the parent folder, or `Jenkinsfile` if the job root is the `PlaywrightAutomation` folder.
5. Save and run the pipeline.

## Pipeline stages

1. **Checkout** — pulls the source code.
2. **Build Docker Image** — builds `adactin-playwright-automation` from the `Dockerfile`.
3. **Run UI and API Tests** — runs all 30 tests in the container and mounts `allure-results`, `test-results` and `logs` back to the Jenkins workspace.
4. **Generate Allure Report** — generates `allure-report` from `allure-results`.
5. **Post** — publishes the Allure report and archives `allure-report`, `test-results` and `logs`.

## Triggers

- SCM polling every 5 minutes.
- Nightly scheduled run.
- A GitHub webhook can also be added to trigger the job on every push.

## Successful-run screenshot deliverable

After a green pipeline run:

1. Open the Jenkins job dashboard.
2. Scroll to **Build History**.
3. Open the successful build number.
4. Capture a screenshot showing the green status and the stage view.
5. Save it as `docs/jenkins-run.png` in the repository and include it with the submission.
