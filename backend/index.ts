import { query, update, nat, Canister, Variant, text, Void, Principal, Record, nat64, Vec, StableBTreeMap, Opt, Result, Err, Ok, ic, Null } from 'azle';

// Those variables are not stable yet (It's not a persistent-storage feature)
// in the next version this code will store the information permanently and uses internet identity for validation

// user declaration
const User = Record({
    id: Principal,
    createdAt: nat64,
    ticketsIds: Vec(Principal),
    username: text
});

//event declaration
const Event = Record({
    id: Principal,
    name: text,
    
    country: text,
    State: text,
    civilTownship: text,
    cityArea: text,
    streetNumber: nat,
    streetName: text,

    creatorUser: Principal,
    createdAt: nat64,
    eventDate: nat64,
    description: text,
    //if amountTickets and ticketCount are the same, users cannot buy for this event anymore
    amountTickets: nat, // Number of tikets avaible for the event
    ticketCount: nat //it counts the number of tickets users bought
})

//Ticket declaration
const Ticket = Record({
    id: Principal,
    ticketNumber: nat,
    eventId: Principal,
    userId: Principal,
    description: text,
})


const Errors = Variant({
    UserDoesNotExist: Principal,
    EventDoesNotExist: Principal,
    TicketDoesNotExist: Principal,
    EVentSoldOUt: Principal
})

let users = StableBTreeMap(Principal, User, 0); 
let Tickets = StableBTreeMap(Principal, Ticket, 1); 
let Events = StableBTreeMap(Principal, Event, 2);


export default Canister({
    createUser: update([text], User, (username) => {
        const id = generateId();
        const user: typeof User = {
            id,
            createdAt: ic.time(),
            ticketsIds: [],
            username,
        };

        users.insert(user.id, user);

        return user;
    }),
    readUserById: query([Principal], Opt(User), (id) => {
        return users.get(id);
    }),
    readUsers: query([], Vec(User), () => {
        return users.values();
    }),
    deleteUser: update([Principal], Result(User, Errors), (id) => {
        const userOpt = users.get(id);

        if ('None' in userOpt) {
            return Err({
                UserDoesNotExist: id
            });
        }

        const user = userOpt.Some;

        //User tickets are deleted if user is deleted
        user.ticketsIds.forEach((ticketId) => {
            Tickets.remove(ticketId);
        });

        users.remove(user.id);

        return Ok(user);
    }),

    //methods to events
    createEvent: update([text,text,text,text,text,nat,text,Principal,nat64,text,nat], Event, (
        eventname, country,State,civilTownship,cityArea,streetNumber,streetName, creatorUser,eventDate,description,amountTickets) => {
        const id = generateId();
        const event: typeof Event = {
            id,
            name:eventname,
            country,
            State,
            civilTownship,
            cityArea,
            streetNumber,
            streetName,
            creatorUser,
            createdAt: ic.time(),
            eventDate,
            description,
            amountTickets,
            ticketCount:BigInt(0)
        };

        Events.insert(event.id, event);

        return event;
    }),

    // methods to tickets
    createTicket: update([ Principal,Principal,text], Result(Ticket,Errors), (eventId,userId,description) => {
        const eventopt = Events.get(eventId);
        if ('None' in eventopt) {
            return Err({
                EventDoesNotExist: eventId
            });
        }
        if ( eventopt.Some.ticketCount >=  eventopt.Some.amountTickets){
            return Err({
                EVentSoldOUt: eventId
            });
        }

        const ticketNumber = eventopt.Some.ticketCount;

        const idTicket = generateId();
        const ticket: typeof Ticket = {
            id: idTicket,
            ticketNumber,
            eventId,
            userId,
            description
        };

        //saving ticket in stable memory
        Tickets.insert(ticket.id, ticket);

        //updating ticketCount and insert it again in the stable memory
        const event = eventopt.Some;
        event.ticketCount++;
        Events.insert(eventId,event);

        
        return Ok(ticket);
    }),
    readTicketById: query([Principal], Opt(Ticket), (id) => {
        return Tickets.get(id);
    }),
    readTickets: query([], Vec(Ticket), () => {
        return Tickets.values();
    }),
    deleteTicket: update([Principal], Result(Ticket, Errors), (id) => {
        const TicketOpt = Tickets.get(id);

        if ('None' in TicketOpt) {
            return Err({
                TicketDoesNotExist: id
            });
        }

        const ticket = TicketOpt.Some;

        // user.recordingIds.forEach((recordingId) => {
        //     recordings.remove(recordingId);
        // });

        Tickets.remove(ticket.id);

        return Ok(ticket);
    }),

})

function generateId(): Principal {
    const randomBytes = new Array(29)
        .fill(0)
        .map((_) => Math.floor(Math.random() * 256));

    return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}