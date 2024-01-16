import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer created events tests", () => {
    it("should register an event handler when a customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("should unregister an event handler when a customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregister("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
            0
        );
    });

    it("should unregister an event handler when a customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeUndefined();
    });

    it("should notify an event handler when a customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsoleLogHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
        ).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(
            1
        );
        expect(
            eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"][0]
        ).toMatchObject(eventHandler);

        const customer = new Customer("1", "Customer 1");
        const address = new Address("Street 1", 123, "12345-123", "City 1");

        customer.changeAddress(address);

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: customer.id,
            nome: customer.name,
            endereco: customer.Address.toString(),
        });

        eventDispatcher.notify(customerAddressChangedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});
