const merchants = [
    {
      "_id": "6392435a59ec222fdb465257",
      "email": "hello@gmail.com",
      "phone": "0768793923",
      "business_name": "Wakadinali001",
      "account_number": "9943",
      "password": "$2a$10$4sAi0peBXjFaELwQgTLNze.1NtYGc8FmZdRyhOvNnf07hF0/P5aYe",
      "isApproved": true,
      "createdAt": "2022-12-08T20:04:42.001Z",
      "updatedAt": "2023-04-07T08:20:01.887Z",
      "__v": 0
    },
    {
      "_id": "639381619673aa4bd3a9e166",
      "email": "business1@gmail.com",
      "phone": "0727873698",
      "business_name": "PETROL1",
      "account_number": "8473",
      "password": "$2a$10$tlui19VVQZ89jJGvNWhiVOzzK/mnA/gXyD7Uguu1G.K7z2Rugr2Zi",
      "isApproved": true,
      "createdAt": "2022-12-09T18:41:37.026Z",
      "updatedAt": "2022-12-09T18:45:33.540Z",
      "__v": 0
    },
    {
      "_id": "63c5b6aac549bcf393f32778",
      "email": "duncanii414@gmail.com",
      "phone": "0769084353",
      "business_name": "Trial",
      "account_number": "2736",
      "password": "$2a$10$c4QhuB62TsgqwiQ7R4W5leMRkC2sXgH5IQnYJ0opwuEzgreUdxeMy",
      "isApproved": false,
      "createdAt": "2023-01-16T20:42:18.464Z",
      "updatedAt": "2023-01-16T20:42:18.464Z",
      "__v": 0
    },
    {
      "_id": "63c5b756c549bcf393f3277e",
      "email": "denzme414@gmail.com",
      "phone": "0769084353",
      "business_name": "Wave",
      "account_number": "8670",
      "password": "$2a$10$kBtbzf5GjZ284Vm2Qt/YDegXHpxSYedy28CASveIHDnjym16f.NGW",
      "isApproved": false,
      "createdAt": "2023-01-16T20:45:10.364Z",
      "updatedAt": "2023-01-16T20:45:10.364Z",
      "__v": 0
    },
    {
      "_id": "63c677efc549bcf393f327ce",
      "email": "fortunelangat54@gmail.com",
      "phone": "0740408496",
      "business_name": "Dev",
      "account_number": "9359",
      "password": "$2a$10$DrR1ZlFKrEgLZbU0BSIsBOeB1vQ7qEBHFdwMEip.c79HK53A/vOMa",
      "isApproved": false,
      "createdAt": "2023-01-17T10:26:55.292Z",
      "updatedAt": "2023-01-17T10:26:55.292Z",
      "__v": 0
    },
    {
      "_id": "63cd1f9cc549bcf393f32db0",
      "email": "duncanweb3@gmail.com",
      "phone": "0769084353",
      "business_name": "Super",
      "account_number": "2493",
      "password": "$2a$10$WKtjTOxZ2apxGcKyVt8aDOorfJ4LxkeHb6G2mwoMJs17M8g9.naUG",
      "isApproved": false,
      "createdAt": "2023-01-22T11:35:56.221Z",
      "updatedAt": "2023-01-22T11:35:56.221Z",
      "__v": 0
    },
    {
      "_id": "63cd20b0c549bcf393f32db4",
      "email": "will@gmail.com",
      "phone": "0769084353",
      "business_name": "Desk",
      "account_number": "7087",
      "password": "$2a$10$Yk8/eD5A/xErpb98Na36Fu6DaO/psQ9uErIi6czeUjxTpjxxdljhi",
      "isApproved": false,
      "createdAt": "2023-01-22T11:40:32.681Z",
      "updatedAt": "2023-01-22T11:40:32.681Z",
      "__v": 0
    },
    {
      "_id": "63cd2204c549bcf393f32db8",
      "email": "astro@gmail.com",
      "phone": "0769084353",
      "business_name": "What Is",
      "account_number": "6429",
      "password": "$2a$10$uP1OsdbWfxREdPAKyIwTdOD8L6rtGB9piPXq1ksSWPHweeEpYTqxa",
      "isApproved": true,
      "createdAt": "2023-01-22T11:46:12.505Z",
      "updatedAt": "2023-01-22T13:16:35.157Z",
      "__v": 0
    },
    {
      "_id": "63cd2dd7c549bcf393f32dc0",
      "email": "brand@gmail.com",
      "phone": "0769084353",
      "business_name": "Free",
      "account_number": "3726",
      "password": "$2a$10$omwMTYn..lJRBzFymODC7ealkiugGPFJ.hAJraOA9sAojrddhsB9W",
      "isApproved": true,
      "createdAt": "2023-01-22T12:36:39.361Z",
      "updatedAt": "2023-01-22T13:15:44.620Z",
      "__v": 0
    },
    {
      "_id": "63cd37c1c549bcf393f32e39",
      "email": "freeman@gmail.com",
      "phone": "0769084353",
      "business_name": "Test",
      "account_number": "3438",
      "password": "$2a$10$.yRhx4DbVYKYi9Yuv8gmC.aTE/ALRFkJAaFwJcAp4rcir6iEdybw2",
      "isApproved": true,
      "createdAt": "2023-01-22T13:18:57.332Z",
      "updatedAt": "2023-01-22T13:19:04.491Z",
      "__v": 0
    },
    {
      "_id": "63d2c573c549bcf393f331da",
      "email": "armed@gmail.com",
      "phone": "0769084353",
      "business_name": "Figures",
      "account_number": "2882",
      "password": "$2a$10$WEEcD3GGadIS/S3xvY6JL.XtAn8I7aI7qLIgwwM4pwhFkYpYDeOwK",
      "isApproved": false,
      "createdAt": "2023-01-26T18:24:51.320Z",
      "updatedAt": "2023-01-26T18:24:51.320Z",
      "__v": 0
    },
    {
      "_id": "63d2c82ec549bcf393f331e2",
      "email": "justice@gmail.com",
      "phone": "0769084353",
      "business_name": "Franchise",
      "account_number": "3950",
      "password": "$2a$10$25u2xvhtJuJfNdcJRttKbuSwAwKZhy3qAbkvf0/Vnutrej7zs22KO",
      "isApproved": true,
      "createdAt": "2023-01-26T18:36:30.057Z",
      "updatedAt": "2023-01-26T18:38:36.709Z",
      "__v": 0
    },
    {
      "_id": "63d2c909c549bcf393f331f0",
      "email": "rizwan44@gmail.com",
      "phone": "0768793923",
      "business_name": "RIZDEVS",
      "account_number": "2676",
      "password": "$2a$10$5rS2p3WG.LT.JCbyVLGx7OpTPOOi3pq4T1kkQvNRee6IZfuXeGaX2",
      "isApproved": true,
      "createdAt": "2023-01-26T18:40:09.321Z",
      "updatedAt": "2023-01-26T18:48:28.935Z",
      "__v": 0
    },
    {
      "_id": "63da8b525bb7b15ed62ce4d5",
      "email": "justlert@gmail.com",
      "phone": "0769084353",
      "business_name": "Prod",
      "account_number": "8507",
      "password": "$2a$10$zNgWf96H/iFu99YYB8ssjeUPr02vrYRJDOrBm/0glp525KuTEZyHa",
      "isApproved": false,
      "createdAt": "2023-02-01T15:54:58.140Z",
      "updatedAt": "2023-02-01T15:54:58.140Z",
      "__v": 0
    },
    {
      "_id": "63da8bd65bb7b15ed62ce4db",
      "email": "flexible@gmail.com",
      "phone": "0769084353",
      "business_name": "Flexible",
      "account_number": "6366",
      "password": "$2a$10$ihEMuTqbybAdcxsFSY8r1OwuuV8giu8JbndVG1N0q22l9zaNVTJRC",
      "isApproved": false,
      "createdAt": "2023-02-01T15:57:10.922Z",
      "updatedAt": "2023-02-01T15:57:10.922Z",
      "__v": 0
    },
    {
      "_id": "63da8c2a5bb7b15ed62ce4df",
      "email": "fractal@gmail.com",
      "phone": "0769084353",
      "business_name": "Fractal",
      "account_number": "4575",
      "password": "$2a$10$z5t8LpxxFZkS/giT09mX4uUHWNxyDZh543WxH0uzAAOOg.lFGfg5a",
      "isApproved": false,
      "createdAt": "2023-02-01T15:58:34.695Z",
      "updatedAt": "2023-02-01T15:58:34.695Z",
      "__v": 0
    },
    {
      "_id": "63da8e0e5bb7b15ed62ce4e3",
      "email": "shadrackr057@gmail.com",
      "phone": "0716009182",
      "business_name": "myBusinessName",
      "account_number": "4479",
      "password": "$2a$10$WcVZyxQGJfVXvLByk.qsAuZU02HYK0tQuY6h.qXlIU0mNbXy6ekDS",
      "isApproved": true,
      "createdAt": "2023-02-01T16:06:38.490Z",
      "updatedAt": "2023-03-28T08:31:03.508Z",
      "__v": 0
    },
    {
      "_id": "63e03fa25bb7b15ed62ce83c",
      "email": "flawless@gmail.com",
      "phone": "0769084353",
      "business_name": "Experiment",
      "account_number": "3667",
      "password": "$2a$10$NFpEmkRXHxC9zXd83fUDbeNJ7Nn1Q3U8ck.dgSwD3CAwM0hYQNR/S",
      "isApproved": false,
      "createdAt": "2023-02-05T23:45:38.010Z",
      "updatedAt": "2023-02-05T23:45:38.010Z",
      "__v": 0
    },
    {
      "_id": "63e9e9875bb7b15ed62ceba1",
      "email": "dynamics@gmail.com",
      "phone": "0769084353",
      "business_name": "What is up",
      "account_number": "4248",
      "password": "$2a$10$JLZCkFa4MNw7mu45UQWMReJaDr5ka5xdVyy9Rfc1bRyFCqGbbbKpu",
      "isApproved": false,
      "createdAt": "2023-02-13T07:40:55.057Z",
      "updatedAt": "2023-02-13T07:40:55.057Z",
      "__v": 0
    },
    {
      "_id": "63ec970880fe112bedac71e7",
      "email": "stuffly@gmail.com",
      "phone": "0769084353",
      "business_name": "Stuffly",
      "account_number": "9840",
      "password": "$2a$10$jKadFtQcX/vs1Rb1nzr/z.kJARXqEqO1o4iDDF3m7JDOtPPrGZxNi",
      "isApproved": false,
      "createdAt": "2023-02-15T08:25:44.325Z",
      "updatedAt": "2023-02-15T08:25:44.325Z",
      "__v": 0
    },
    {
      "_id": "63ec9d45dbe0be4c9572e24a",
      "email": "trynew@gmail.com",
      "phone": "0769084353",
      "business_name": "Trynew",
      "account_number": "3536",
      "password": "$2a$10$SGpGfjY1VqsB4eYiueulzeupNUYczpRLMQtLwRApG8Hsv/z.FWC8y",
      "isApproved": true,
      "createdAt": "2023-02-15T08:52:21.652Z",
      "updatedAt": "2023-02-15T09:06:10.716Z",
      "__v": 0
    },
    {
      "_id": "63edcfb4f2a2353aab0f8a4f",
      "email": "mentor@gmail.com",
      "phone": "0769084353",
      "business_name": "Mentor",
      "account_number": "6314",
      "password": "$2a$10$bMYwQF.nTU0jV4y9BRt/p.2NyLxCllYPxRyJXF.0PAAhG6ynbXmfi",
      "isApproved": false,
      "createdAt": "2023-02-16T06:39:48.553Z",
      "updatedAt": "2023-02-16T06:39:48.553Z",
      "__v": 0
    },
    {
      "_id": "63ef2934f2a2353aab0f8b48",
      "email": "mentioned@gmail.com",
      "phone": "0769084353",
      "business_name": "Mentioned",
      "account_number": "9676",
      "password": "$2a$10$aWdY7bXCqknghS0F3vglF.jZ21IKC1vM7obNybZu6IXRNAp7UZr1S",
      "isApproved": true,
      "createdAt": "2023-02-17T07:13:56.297Z",
      "updatedAt": "2023-03-01T15:26:34.475Z",
      "__v": 0
    },
    {
      "_id": "63ef298bf2a2353aab0f8b54",
      "email": "trynow@gmail.com",
      "phone": "0769084353",
      "business_name": "TryNow",
      "account_number": "9358",
      "password": "$2a$10$TeXyIk3q.sfI6HvnthyY7OV8Mu1aRIyVLCBLzKItwqy4/jtZAqSBi",
      "isApproved": true,
      "createdAt": "2023-02-17T07:15:23.316Z",
      "updatedAt": "2023-02-17T07:17:14.788Z",
      "__v": 0
    },
    {
      "_id": "63f3a033f2a2353aab0f8c0b",
      "email": "one@gmail.com",
      "phone": "0740408496",
      "business_name": "test",
      "account_number": "4693",
      "password": "$2a$10$NfjV/Wnqmh7HGpBO.hcFQ.97zDRKvolFhlStMW5WhOpfjJzdtJkQu",
      "isApproved": false,
      "createdAt": "2023-02-20T16:30:43.431Z",
      "updatedAt": "2023-02-20T16:30:43.431Z",
      "__v": 0
    },
    {
      "_id": "63f5e76d4ff4b41601a5c542",
      "email": "testUser@gmail.com",
      "phone": "0768793923",
      "business_name": "Test User",
      "account_number": "1230",
      "password": "$2a$10$.TFfvQWz1opZqAyoDI8PreWR138PnUpKigMIheIXlYPrY5tHFWy3S",
      "isApproved": true,
      "createdAt": "2023-02-22T09:59:09.640Z",
      "updatedAt": "2023-02-22T09:59:37.613Z",
      "__v": 0
    },
    {
      "_id": "63f5e83e4ff4b41601a5c562",
      "email": "testUser1@gmail.com",
      "phone": "0703159419",
      "business_name": "Test User One",
      "account_number": "5459",
      "password": "$2a$10$C5U.jCxEKXYu4gwOxtD2j.g8pON05yln.DsUZrViyJsCI0gugQ0Xm",
      "isApproved": true,
      "createdAt": "2023-02-22T10:02:38.811Z",
      "updatedAt": "2023-02-22T10:12:25.244Z",
      "__v": 0
    },
    {
      "_id": "63f5e8e04ff4b41601a5c578",
      "email": "testUser2@gmail.com",
      "phone": "0703159419",
      "business_name": "Test User Two",
      "account_number": "7096",
      "password": "$2a$10$Y8yVXICZEVnP0I8e3mZ13.B43MG.bAdfCXkts.6e78sK52NOkLDH.",
      "isApproved": true,
      "createdAt": "2023-02-22T10:05:20.941Z",
      "updatedAt": "2023-02-22T10:13:34.509Z",
      "__v": 0
    },
    {
      "_id": "63f5e9074ff4b41601a5c584",
      "email": "testUser3@gmail.com",
      "phone": "0724862687",
      "business_name": "Test User Three",
      "account_number": "2152",
      "password": "$2a$10$/XCYWzVqRYjkgmTe5YTt2ecchN5OWZNJlIXAxMkk/KbJRmZ7ZIyOC",
      "isApproved": true,
      "createdAt": "2023-02-22T10:05:59.359Z",
      "updatedAt": "2023-02-22T10:13:54.859Z",
      "__v": 0
    },
    {
      "_id": "63f5e92c4ff4b41601a5c590",
      "email": "testUser4@gmail.com",
      "phone": "0724862687",
      "business_name": "Test User Four",
      "account_number": "5151",
      "password": "$2a$10$UOSZCZ/j5UABYST4q4gOsu8VY.ZFvnvXgjhvYV9Isx/1q0ehsw3te",
      "isApproved": true,
      "createdAt": "2023-02-22T10:06:36.773Z",
      "updatedAt": "2023-02-22T10:13:58.649Z",
      "__v": 0
    },
    {
      "_id": "63f5e9574ff4b41601a5c59c",
      "email": "testUser5@gmail.com",
      "phone": "0721694961",
      "business_name": "Test User Five",
      "account_number": "3575",
      "password": "$2a$10$Nie0e.0yFrcadzhbG4MxOe2DpC39sQ.JxFHTdqNaUMs2uL5YG7wji",
      "isApproved": true,
      "createdAt": "2023-02-22T10:07:19.229Z",
      "updatedAt": "2023-02-22T10:14:01.666Z",
      "__v": 0
    },
    {
      "_id": "63f5e9844ff4b41601a5c5a8",
      "email": "testUser6@gmail.com",
      "phone": "0721694961",
      "business_name": "Test User Six",
      "account_number": "9146",
      "password": "$2a$10$82p/B8AtrnUN7Dc8wAIg3.olNKza0EGi9KuWUQ4.CkZoJCQ5SKpE6",
      "isApproved": true,
      "createdAt": "2023-02-22T10:08:04.581Z",
      "updatedAt": "2023-02-22T10:14:04.889Z",
      "__v": 0
    },
    {
      "_id": "63f5e9a94ff4b41601a5c5b4",
      "email": "testUser7@gmail.com",
      "phone": "0724122966",
      "business_name": "Test User Seven",
      "account_number": "4449",
      "password": "$2a$10$4iHUWb5mEF3JEykTuS.CDuQ8Atg0wH4XJth4j5/7aHGa1OzM7bLgO",
      "isApproved": true,
      "createdAt": "2023-02-22T10:08:41.087Z",
      "updatedAt": "2023-02-22T10:14:08.103Z",
      "__v": 0
    },
    {
      "_id": "63f5e9c84ff4b41601a5c5c0",
      "email": "testUser8@gmail.com",
      "phone": "0724122966",
      "business_name": "Test User Eight",
      "account_number": "6093",
      "password": "$2a$10$d7CjlsxNO3TobCAC1zrY6OtqBGvH/RNRfb4.kjMolzUkufAqEys4y",
      "isApproved": true,
      "createdAt": "2023-02-22T10:09:12.971Z",
      "updatedAt": "2023-02-22T10:14:12.778Z",
      "__v": 0
    },
    {
      "_id": "63fe1d5786118a65e2e1e272",
      "email": "test10@gmail.com",
      "phone": "0769084353",
      "business_name": "Test Ten",
      "account_number": "8299",
      "password": "$2a$10$8YggUeVDp1M48oIz628k9.ufEY6sg0WnkpFd4WmN5/dY9On2mf8/K",
      "isApproved": false,
      "createdAt": "2023-02-28T15:27:19.799Z",
      "updatedAt": "2023-02-28T15:27:19.799Z",
      "__v": 0
    },
    {
      "_id": "63fe1f6886118a65e2e1e27f",
      "email": "test11@gmail.com",
      "phone": "0769084353",
      "business_name": "Test 11",
      "account_number": "5550",
      "password": "$2a$10$eTnJBUnDhAuZDQQk699.L.54G11GToaNXCbWDPzJjTjK0wSGM8Rke",
      "isApproved": false,
      "createdAt": "2023-02-28T15:36:08.449Z",
      "updatedAt": "2023-02-28T15:36:08.449Z",
      "__v": 0
    },
    {
      "_id": "63fe1fc086118a65e2e1e28b",
      "email": "test12@gmail.com",
      "phone": "0769084353",
      "business_name": "Test 12",
      "account_number": "4483",
      "password": "$2a$10$QNlggNWDUT1O/hdr/SZ2euvAf.0/YvBL5lmI7MLQrK/QQx3jc0pyS",
      "isApproved": true,
      "createdAt": "2023-02-28T15:37:36.181Z",
      "updatedAt": "2023-02-28T16:09:18.752Z",
      "__v": 0
    },
    {
      "_id": "63fe217c86118a65e2e1e2fc",
      "email": "test13@gmail.com",
      "phone": "0769084353",
      "business_name": "Test 13",
      "account_number": "2747",
      "password": "$2a$10$3wN86e7pbpxXZ9JBnewizegsgPyhWV6a82dfvVDMfqztxP/qKQhaa",
      "isApproved": true,
      "createdAt": "2023-02-28T15:45:00.205Z",
      "updatedAt": "2023-02-28T16:06:03.809Z",
      "__v": 0
    },
    {
      "_id": "63fe274686118a65e2e1e3ed",
      "email": "test14@gmail.com",
      "phone": "0769084353",
      "business_name": "Test 14",
      "account_number": "1105",
      "password": "$2a$10$JUBWuYdYxhYrWKsSmFVLI.Qb3y5SKRstSbzTSiY3XD8DU/RZuHu9W",
      "isApproved": true,
      "createdAt": "2023-02-28T16:09:42.725Z",
      "updatedAt": "2023-02-28T16:09:50.891Z",
      "__v": 0
    },
    {
      "_id": "63fe300486118a65e2e1e406",
      "email": "fortunelangat54@gmail.com",
      "phone": "0740408496",
      "business_name": "Fortune Dev Academy",
      "account_number": "2416",
      "password": "$2a$10$DfgDVYuEoruvTXoLvhLOPOxkIMOnL9cbCOoo6cEdO6RLkAD5upNbO",
      "isApproved": true,
      "createdAt": "2023-02-28T16:47:00.967Z",
      "updatedAt": "2023-02-28T16:52:47.063Z",
      "__v": 0
    },
    {
      "_id": "63fe393186118a65e2e1e438",
      "email": "rizzy@gmail.com",
      "phone": "0768793923",
      "business_name": "RIGGYG",
      "account_number": "4748",
      "password": "$2a$10$vauTJeMDw2.6ZiZp5Sd07uAWyh788keQzg1OGZ/u5WPpEsJMYZhou",
      "isApproved": true,
      "createdAt": "2023-02-28T17:26:09.833Z",
      "updatedAt": "2023-02-28T17:26:26.622Z",
      "__v": 0
    },
    {
      "_id": "63fe4a6286118a65e2e1e4a1",
      "email": "chepkiten@gmail.com",
      "phone": "0727873698",
      "business_name": "mamamboga",
      "account_number": "6320",
      "password": "$2a$10$0UHMQzSgrInjkF1fILjZ0OHhGr9yIvtkO.Ra9.JuLn3V18slxcMgi",
      "isApproved": true,
      "createdAt": "2023-02-28T18:39:30.043Z",
      "updatedAt": "2023-02-28T18:48:14.982Z",
      "__v": 0
    },
    {
      "_id": "63fe4dab86118a65e2e1e4e4",
      "email": "kdouglasrono@gmail.com",
      "phone": "0727873698",
      "business_name": "Chapa kazi",
      "account_number": "7849",
      "password": "$2a$10$FvSjwbG0OA7VlLsm0r8P/O6VWOncKWmVd7lXAE3X8aHhITA/CBMWi",
      "isApproved": true,
      "createdAt": "2023-02-28T18:53:31.918Z",
      "updatedAt": "2023-04-07T08:24:12.875Z",
      "__v": 0
    },
    {
      "_id": "63fe504d86118a65e2e1e546",
      "email": "test45@gmail.com",
      "phone": "0740408496",
      "business_name": "testaccount",
      "account_number": "3040",
      "password": "$2a$10$CRKralzDtXCcmXsQF5Fj2ej0AvPwTDnqZb.1clZFVrckfGEc5cWCO",
      "isApproved": false,
      "createdAt": "2023-02-28T19:04:45.952Z",
      "updatedAt": "2023-02-28T19:04:45.952Z",
      "__v": 0
    },
    {
      "_id": "63ff4da086118a65e2e1e634",
      "email": "benjafreepass@gmail.com",
      "phone": "0740408496",
      "business_name": "Benja",
      "account_number": "3836",
      "password": "$2a$10$P2UB1PHm4Sd3t4qoEziVhehlb64Oz6TNkg5GHhwyasmwfa4.g1cCm",
      "isApproved": true,
      "createdAt": "2023-03-01T13:05:36.540Z",
      "updatedAt": "2023-03-16T06:22:20.752Z",
      "__v": 0
    },
    {
      "_id": "63ff8c2786118a65e2e1e7a6",
      "email": "shadackr057@gmail.com",
      "phone": "0716009182",
      "business_name": "shop",
      "account_number": "6746",
      "password": "$2a$10$.z2UwcV2VFZYHMk6iCEDBuuhCA5GOBz8aNFJcRuUTmIKhDnJ3PEVW",
      "isApproved": true,
      "createdAt": "2023-03-01T17:32:23.217Z",
      "updatedAt": "2023-03-16T06:22:07.964Z",
      "__v": 0
    },
    {
      "_id": "6411b04686118a65e2e1f538",
      "email": "rizwan1@gmail.com",
      "phone": "0768793923",
      "business_name": "devriz",
      "account_number": "4545",
      "password": "$2a$10$p.jRjQrCDJjOhaF8nr6bje1TCRfRI8ZrBomJ6XmmnIgJzVHlAB8BC",
      "isApproved": true,
      "createdAt": "2023-03-15T11:47:18.734Z",
      "updatedAt": "2023-03-15T11:50:28.061Z",
      "__v": 0
    },
    {
      "_id": "642305c1f658227a0a00f02a",
      "email": "myEmail@gmail.com",
      "phone": "0716009182",
      "business_name": "myShop",
      "account_number": "5657",
      "password": "$2a$10$RlEAUkziYpusgR7niC9L8ex3iTdynAiEKvor0sUCZb9MpZu/kS4xi",
      "isApproved": false,
      "createdAt": "2023-03-28T15:20:33.591Z",
      "updatedAt": "2023-03-28T15:20:33.591Z",
      "__v": 0
    },
    {
      "_id": "64230d92f658227a0a00f071",
      "email": "myEmail@gmail.com",
      "phone": "0716009182",
      "business_name": "myShop1",
      "account_number": "9468",
      "password": "$2a$10$H3uqiCo1yVIcwTRDHggK3e0hqR8AYN2sLiVGXUpc6DGPmGVDZf/Qy",
      "isApproved": false,
      "createdAt": "2023-03-28T15:53:54.167Z",
      "updatedAt": "2023-03-28T15:53:54.167Z",
      "__v": 0
    },
    {
      "_id": "64230ddcf658227a0a00f075",
      "email": "shadrackr057@gmail.com",
      "phone": "0716009182",
      "business_name": "myBusinessName1",
      "account_number": "7009",
      "password": "$2a$10$WJt2pcxg4MnEEw72qhpeTuKbSFwCTlpTdqeqmzJEW/ZYAz5aBbmWC",
      "isApproved": false,
      "createdAt": "2023-03-28T15:55:08.912Z",
      "updatedAt": "2023-04-13T08:09:59.190Z",
      "__v": 0
    },
    {
      "_id": "64232080f658227a0a00f0e9",
      "email": "kdouglasrono@gmail.com",
      "phone": "0727873698",
      "business_name": "bodaboda",
      "account_number": "2092",
      "password": "$2a$10$AsgyXHfzFciSYxLPveWn7elso4.Q4/XuDnDn8pA5lGd0lZaS4YYFO",
      "isApproved": true,
      "createdAt": "2023-03-28T17:14:40.105Z",
      "updatedAt": "2023-03-28T17:25:53.168Z",
      "__v": 0
    },
    {
      "_id": "6423225af658227a0a00f0fd",
      "email": "chepkiten@gmail.com",
      "phone": "0727873698",
      "business_name": "bodabod",
      "account_number": "3728",
      "password": "$2a$10$MisJCCmnWtifPenDoUKTL.zXMV8LgtRiGxKj4X9jvtFJBSGiRj2tG",
      "isApproved": true,
      "createdAt": "2023-03-28T17:22:34.730Z",
      "updatedAt": "2023-03-28T17:25:36.674Z",
      "__v": 0
    },
    {
      "_id": "642c42c1521dca5291dbf2bb",
      "email": "chepkuruiwins@gmail.com",
      "phone": "0703396235",
      "business_name": "Kaku shop",
      "account_number": "9460",
      "password": "$2a$10$owfDJXpOqMWrw/QNbI/6KetsKf0G5cDHKU4P5RTECnz84M2nb.qdi",
      "isApproved": true,
      "createdAt": "2023-04-04T15:31:13.700Z",
      "updatedAt": "2023-04-04T15:32:04.402Z",
      "__v": 0
    },
    {
      "_id": "642fc2b475a373821811fc69",
      "email": "tonykipkorir@gmail.com",
      "phone": "0717093369",
      "business_name": "Tony Shop",
      "account_number": "9634",
      "password": "$2a$10$frWrqhtdVYUoSWv1AyWg7.sqz1qvc1IuUMFkIpDEr.m/R9dKJZLJq",
      "isApproved": true,
      "createdAt": "2023-04-07T07:13:56.860Z",
      "updatedAt": "2023-04-07T07:15:30.423Z",
      "__v": 0
    },
    {
      "_id": "643461eccf9f7df88562fca7",
      "email": "geofrey@gmail.com",
      "phone": "0707652437",
      "business_name": "geofrey",
      "account_number": "9034",
      "password": "$2a$10$lxbCNoTF1BoXRNb/1nEcn.e/8BPiVvQTRW2xjut82VnvgmSl3pdWy",
      "isApproved": true,
      "createdAt": "2023-04-10T19:22:20.365Z",
      "updatedAt": "2023-04-10T19:23:20.551Z",
      "__v": 0
    },
    {
      "_id": "643462cecf9f7df88562fcea",
      "email": "josphat@gmail.com",
      "phone": "0703159419",
      "business_name": "Josphat",
      "account_number": "3040",
      "password": "$2a$10$aXfXx6Wwa5pb8pUet00/cusYNQJcXBsolOIzJ8qfbmE055pYv1Kpy",
      "isApproved": true,
      "createdAt": "2023-04-10T19:26:06.102Z",
      "updatedAt": "2023-04-10T19:26:16.780Z",
      "__v": 0
    },
    {
      "_id": "6434faf3cf9f7df88562fdab",
      "email": "prono@gmail.com",
      "phone": "0729115078",
      "business_name": "Kiprono",
      "account_number": "4645",
      "password": "$2a$10$MuvGczzadb7jxdQr7GBb..6FgLlKvRG4f/HEZxvQwnDKWM77ZndcO",
      "isApproved": true,
      "createdAt": "2023-04-11T06:15:15.023Z",
      "updatedAt": "2023-04-11T06:15:35.547Z",
      "__v": 0
    },
    {
      "_id": "64353795cf9f7df88562fe95",
      "email": "ronald@gmail.com",
      "phone": "0720061921",
      "business_name": "Ronald",
      "account_number": "1366",
      "password": "$2a$10$08gRgbJC8TcX8o9K.ZrdIu3ugjY17DJO7qRCPjrgjPVTE2kD8XApa",
      "isApproved": true,
      "createdAt": "2023-04-11T10:33:57.607Z",
      "updatedAt": "2023-04-11T10:34:24.283Z",
      "__v": 0
    },
    {
      "_id": "6436522bcf9f7df8856301d3",
      "email": "shadrackr056@gmail.com",
      "phone": "0716009182",
      "business_name": "Hambros Suites",
      "account_number": "4900",
      "password": "$2a$10$ijh5/UagCh1y3784T0Nw0OgwyFPHc1IsbuAZ8iL3HXrUcXYoAX7Ce",
      "isApproved": true,
      "createdAt": "2023-04-12T06:39:39.735Z",
      "updatedAt": "2023-04-12T06:40:24.365Z",
      "__v": 0
    },
    {
      "_id": "64381720cf9f7df8856308ca",
      "email": "wesley@gmail.com",
      "phone": "0729229050",
      "business_name": "wesley",
      "account_number": "1375",
      "password": "$2a$10$zQJCLaNzSKQwbOv7EyzMMuMg7Xlo3cMOFjy8DtyNkYkcWXPa5qX2m",
      "isApproved": true,
      "createdAt": "2023-04-13T14:52:16.250Z",
      "updatedAt": "2023-04-13T14:53:03.601Z",
      "__v": 0
    },
    {
      "_id": "6450cbe2140f09420c72e2c8",
      "email": "cheruiyot@gmail.com",
      "phone": "0721221910",
      "business_name": "Fred",
      "account_number": "1481",
      "password": "$2a$10$7W5A0DevlAfUYJMx8g9kSOx/qjyUZJJVfzYlbuzc2NCwLZkRo6CGe",
      "isApproved": true,
      "createdAt": "2023-05-02T08:37:54.342Z",
      "updatedAt": "2023-05-02T08:39:31.104Z",
      "__v": 0
    },
    {
      "_id": "64510944140f09420c72e36a",
      "email": "robinson@gmail.com",
      "phone": "0719208828",
      "business_name": "robinson",
      "account_number": "2149",
      "password": "$2a$10$ewW7oQjDrdoGryULA9j4t.sgcgvlCbrszV3b0zuFmlfE2O5fQAwYa",
      "isApproved": true,
      "createdAt": "2023-05-02T12:59:48.263Z",
      "updatedAt": "2023-05-02T13:27:16.076Z",
      "__v": 0
    },
    {
      "_id": "645109ee140f09420c72e373",
      "email": "chirchir@gmail.com",
      "phone": "0727849058",
      "business_name": "Chirchir",
      "account_number": "7366",
      "password": "$2a$10$z3ogL4C5Nd1I/BuvFhkmm.aK3VQb3YaFUANwVvO2PuwfUfVJ644P2",
      "isApproved": true,
      "createdAt": "2023-05-02T13:02:38.258Z",
      "updatedAt": "2023-05-02T13:24:24.845Z",
      "__v": 0
    },
    {
      "_id": "64510a66140f09420c72e37a",
      "email": "evans@gmail.com",
      "phone": "0727849058",
      "business_name": "Evans",
      "account_number": "2446",
      "password": "$2a$10$zAuflWq3dR8l1fNV/mmtZ.FJSUfQwGHUT8lMT5jZYCjz5cyW3bVJi",
      "isApproved": true,
      "createdAt": "2023-05-02T13:04:38.153Z",
      "updatedAt": "2023-05-02T14:20:17.545Z",
      "__v": 0
    },
    {
      "_id": "64510b0f140f09420c72e389",
      "email": "evanss@gmail.com",
      "phone": "0720040448",
      "business_name": "Evanss",
      "account_number": "2005",
      "password": "$2a$10$nqqIb9HIiPyquCxR6k2f..ExkFPCCD/Nwky2c9J4sLAiEu7sWN4PS",
      "isApproved": true,
      "createdAt": "2023-05-02T13:07:27.204Z",
      "updatedAt": "2023-05-02T13:23:20.570Z",
      "__v": 0
    },
    {
      "_id": "64510b53140f09420c72e38f",
      "email": "renny@gmail.com",
      "phone": "0719679466",
      "business_name": "Renny",
      "account_number": "7106",
      "password": "$2a$10$MXWtfLSnC4hu8pG/AjeEu.3FxYsL.meI.613EFIj/PbYMXkJvsMS2",
      "isApproved": true,
      "createdAt": "2023-05-02T13:08:35.466Z",
      "updatedAt": "2023-05-02T13:21:55.079Z",
      "__v": 0
    },
    {
      "_id": "64510ba1140f09420c72e395",
      "email": "benja@gmail.com",
      "phone": "0723419151",
      "business_name": "Benjamin",
      "account_number": "1332",
      "password": "$2a$10$Yi525axYDZRPiqJxWE8Yh.ozeE9xxjRKuhXaIiXMTiUb1QsEXRUlS",
      "isApproved": true,
      "createdAt": "2023-05-02T13:09:53.801Z",
      "updatedAt": "2023-05-02T13:21:50.354Z",
      "__v": 0
    },
    {
      "_id": "64510bc9140f09420c72e39a",
      "email": "korir@gmail.com",
      "phone": "0724937981",
      "business_name": "Korir",
      "account_number": "6235",
      "password": "$2a$10$gGi/9L6AfHipavz61/s/ZOpbpzaeb/YSK2XK5L485BE6SLPSnRj66",
      "isApproved": true,
      "createdAt": "2023-05-02T13:10:33.404Z",
      "updatedAt": "2023-05-02T13:18:59.372Z",
      "__v": 0
    },
    {
      "_id": "6451113d140f09420c72e3e0",
      "email": "collins@gmail.com",
      "phone": "0790461316",
      "business_name": "Collins",
      "account_number": "6777",
      "password": "$2a$10$n.V1HzzRtQFlguhTWplf0O2FdV1UgM5MJTbB25NL3kDEuK51aj/iu",
      "isApproved": true,
      "createdAt": "2023-05-02T13:33:49.028Z",
      "updatedAt": "2023-05-02T13:35:35.795Z",
      "__v": 0
    },
    {
      "_id": "64511355140f09420c72e3f3",
      "email": "cosmas@gmail.com",
      "phone": "0722567806",
      "business_name": "Cosmas",
      "account_number": "3067",
      "password": "$2a$10$uVVSL5hWyK4nHkI8rrk1ruCiQ3L0AtaPnuhnH/87aBKmEKp6nrKjC",
      "isApproved": true,
      "createdAt": "2023-05-02T13:42:45.353Z",
      "updatedAt": "2023-05-02T13:43:26.817Z",
      "__v": 0
    },
    {
      "_id": "64511939140f09420c72e404",
      "email": "victor@gmail.com",
      "phone": "0704000312",
      "business_name": "Victor",
      "account_number": "1783",
      "password": "$2a$10$S3bNusWZ/ZcJqZG.MXnq4.3/4hi0kT0SkrTgwaemgSnUxRKHDFjfG",
      "isApproved": true,
      "createdAt": "2023-05-02T14:07:53.627Z",
      "updatedAt": "2023-05-02T14:20:09.519Z",
      "__v": 0
    },
    {
      "_id": "64511982140f09420c72e40c",
      "email": "nehemiah@gmail.com",
      "phone": "0758850277",
      "business_name": "Nhemiah",
      "account_number": "7916",
      "password": "$2a$10$gmvwTn0zzaMGgYn0J3RD3.T4wh3ZR8AXoyXgIlhitX2APKv9jUCV.",
      "isApproved": true,
      "createdAt": "2023-05-02T14:09:06.187Z",
      "updatedAt": "2023-05-02T14:19:58.024Z",
      "__v": 0
    },
    {
      "_id": "64511bef140f09420c72e416",
      "email": "viny@gmail.com",
      "phone": "0729943041",
      "business_name": "vincent",
      "account_number": "8610",
      "password": "$2a$10$6hMOG8ikz/KIo1FShAp7su0oddqeTowPbpFeCjMZ1jyssNUuASqxS",
      "isApproved": true,
      "createdAt": "2023-05-02T14:19:27.133Z",
      "updatedAt": "2023-05-02T14:19:54.172Z",
      "__v": 0
    },
    {
      "_id": "6453c2b5140f09420c73273e",
      "email": "hesbon@gmail.com",
      "phone": "0729177770",
      "business_name": "Hesbon",
      "account_number": "2686",
      "password": "$2a$10$5PTZAo.06mjTIDY2Lolj1O7UYkSjHNMXJJu6zv4GKYdpe85NYeag6",
      "isApproved": true,
      "createdAt": "2023-05-04T14:35:33.836Z",
      "updatedAt": "2023-05-04T14:36:33.388Z",
      "__v": 0
    },
    {
      "_id": "6453c7e2140f09420c732772",
      "email": "gilbert@gmail.com",
      "phone": "0701886484",
      "business_name": "Gilbert",
      "account_number": "4958",
      "password": "$2a$10$khJT9nJgbYsLof/2tqGUDuvbTvk34KIm8ZfE8kYl0ksSvi1i.Y28u",
      "isApproved": true,
      "createdAt": "2023-05-04T14:57:38.557Z",
      "updatedAt": "2023-05-04T14:58:08.236Z",
      "__v": 0
    },
    {
      "_id": "645f37cd140f09420c743f5d",
      "email": "douglas.rono@jasirifellow.org",
      "phone": "0727873698",
      "business_name": "Testing",
      "account_number": "2992",
      "password": "$2a$10$3b4I3lfWoI1pty1OmBA0Uus7VVZuCxzKmrmVf6lytO8oLNFVj6BIy",
      "isApproved": true,
      "createdAt": "2023-05-13T07:10:05.351Z",
      "updatedAt": "2023-05-13T07:10:27.396Z",
      "__v": 0
    },
    {
      "_id": "6462e45c140f09420c744932",
      "email": "hadasah@gmail.com",
      "phone": "0705280119",
      "business_name": "Chepkiten",
      "account_number": "7036",
      "password": "$2a$10$HI3ovwts4/ZLWVH6LpjqDuwkQVD6qphI7Lq17E23V3uo7KJv6Wbra",
      "isApproved": true,
      "createdAt": "2023-05-16T02:03:08.759Z",
      "updatedAt": "2023-05-16T02:03:27.166Z",
      "__v": 0
    },
    {
      "_id": "646b8551457408a495e2961c",
      "email": "chels@gmail.com",
      "phone": "0748740668",
      "business_name": "Mercy",
      "account_number": "6866",
      "password": "$2a$10$Jf8X6qcpvNqxfsH2/YYkZOFy5ehktFUmbqak8kFp60797sDeAw5bK",
      "isApproved": true,
      "createdAt": "2023-05-22T15:08:01.165Z",
      "updatedAt": "2023-05-22T15:08:29.842Z",
      "__v": 0
    }
  ]

module.exports = merchants