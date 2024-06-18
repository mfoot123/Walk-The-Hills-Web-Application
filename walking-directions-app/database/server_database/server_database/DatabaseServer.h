#ifndef HOSTSERVER
#define HOSTSERVER


#include "networking\hdelibc-networking.h"
#include "command_parser.h"
#include "RouteMap.h"
#include "RouteInfoNode.h"

/// <summary>
/// DatabaseServer class responsible for handling client requests and providing responses.
/// </summary>
class DatabaseServer : public HDE::SimpleServer
{
public:
	/// <summary>
/// Constructor for DatabaseServer class.
/// </summary>
	DatabaseServer();

	/// <summary>
/// Launches the server and starts listening for client connections.
/// </summary>
	void launch();

private:

	/// <summary>
/// Accepts incoming client connections.
/// </summary>
	void accepter();

	/// <summary>
/// Handles client requests by parsing and processing them.
/// </summary>
	void handler();

	/// <summary>
/// Responds to client requests with appropriate messages.
/// </summary>
	void responder();

	char buffer[30720] = { 0 }; ///< Buffer for storing received data.

	int new_socket; ///< Socket for handling client connection.
	std::string client_request; ///< Request received from the client.
	RouteMap pullman_routes; ///< Database of routes and associated information.
	std::string action_taken; ///< Action performed by the server.
	std::string serverMessage; ///< Response message to be sent to the client.

};
#endif // !HOSTSERVER
