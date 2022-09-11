const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

describe("tests of receive and fallback function", function () {
    beforeEach(async function () {
        ;[owner, wallet1, wallet2] = await ethers.getSigners()

        level = await ethers.getContractFactory("Level", owner)
        Level = await level.deploy("1000000000000000000000", "50000000000000000")

        stones = await ethers.getContractFactory("Stones", owner)
        Stones = await stones.deploy("50000000000000000")

        pokemons = await ethers.getContractFactory("Pokemons", owner)
        Pokemons = await pokemons.deploy("50000000000000", "16000000000000000000", Level.address, Stones.address)
    })

    it("should call mintRandomPokemons if receive function occure", async () => {
        tx = {
            to: Pokemons.address,
            value: ethers.utils.parseEther("2", "ether"),
        }
        expect(await wallet1.sendTransaction(tx)).to.emit(MockedPokemons, "NewPokemon")
    })
    it("should call mintRandomPokemons if receive function occure", async () => {
        tx = {
            to: Pokemons.address,
        }
        expect(await wallet1.sendTransaction(tx)).to.emit(MockedPokemons, "NewPokemon")
    })
})
