# The VisualEditor
This is the visual companion of Miller for our the digital exibition websites.

Build a specific version for a project is as easy as:

- get your project name, e.g. `histjust`
- get the git tag in `master` branch with `git tag`, e.g. `v1.1.2`
- copy `cp .env.example .env` and edit `REACT_APP_MILLER_CLIENT_ID` according to the target Miller instance
- verify the values of `REACT_APP_DOCUMENT_SCHEMA`
- build using `make` and concatenate project name and version number in the `BUILD_TAG`: env variable

    ```
    BUILD_TAG=histjust-v1.1.2 make build-docker-image
    ```

## Additional Notes

In the source code we usually refer to the env variable `REACT_APP_EDITOR_BASENAME`.
This is generated from the `PUBLIC_URL` that is not integrated in the react app as such.
