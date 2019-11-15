const INPUT_VALUE = document.querySelector("#input")
const SEARCH_BUTTON = document.querySelector("#button")
const USERDATA = document.querySelector("#userdata")
const PROFILE = document.querySelector("#profile")
const AVATAR = document.querySelector("#avatar")
const USERNAME = document.querySelector("#username")
const NAME = document.querySelector("#name")
const BIO = document.querySelector("#bio")
const REPO = document.querySelector("#repo")
const ERROR = document.querySelector("#error")

const CLIENT_ID = "Iv1.d2df1583b98065bc"
const CLIENT_SECRET = "d75e07a7dfc3f1c4b7784d3b07955dde57027b1a"

const FETCH_USERS = async (user) => {
    const API_CALL = await fetch(`https://api.github.com/users/${user}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`)
    const DATA = await API_CALL.json()
    if (!DATA.id) {
        ERROR.innerHTML = `<p id="usernotfound">Does not exist</p>`
        USERDATA.classList.add("hide")
    } else {
        ERROR.innerHTML = ""
        USERDATA.classList.remove("hide")
        return { data: DATA }
    }
}

const SHOW_DATA = () => {
    FETCH_USERS(INPUT_VALUE.value).then((res) => {
        AVATAR.src = res.data.avatar_url
        USERNAME.innerHTML = `@${res.data.login}`
        NAME.innerHTML = res.data.name
        BIO.innerHTML = res.data.bio
        SHOW_REPOS(`${res.data.repos_url}?per_page=100`);
    })
}

const FETCH_REPOS = async (url) => {
    const API_CALL = await fetch(url)
    const DATA = await API_CALL.json()
    return { data: DATA }
}

const SHOW_REPOS = (url) => {
    REPO.innerHTML = ""
    FETCH_REPOS(url).then((res) => {
        listItems = res.data.reduce((result, item) => {
            result += `<li>
                            <div class="repository">
                                <div>
                                    <h1 class="repository_name">${item.name}</h1>
                                </div>
                                <div class="stars_forks">
                                    <div class="star_fork">
                                        <i class="fas fa-star"></i>
                                        <p>${item.stargazers_count}</p>
                                    </div>
                                    <div class="star_fork">
                                        <i class="fas fa-code-branch"></i>
                                        <p>${item.forks}</p>
                                    </div>
                                </div>
                            </div>
                        </li>`
            return result
        }, '')
        REPO.innerHTML = listItems
    })
}

INPUT_VALUE.addEventListener("keyup", (event) => {
    if (event.keyCode === 13) {
        SHOW_DATA()
    }
})

SEARCH_BUTTON.addEventListener("click", () => {
    SHOW_DATA()
})