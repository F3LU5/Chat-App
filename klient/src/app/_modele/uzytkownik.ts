import { zdjecia } from "./zdjecie"

export interface Uzytkownik {
    id: number
    username: string
    wiek: number
    zdjecieUrl: string
    onas: string
    stworzone: Date
    ostatniaAktywnosc: Date
    plec: string
    wstep: string
    miasto: string
    kraj: string
    zdjecia: zdjecia[]
  }
  