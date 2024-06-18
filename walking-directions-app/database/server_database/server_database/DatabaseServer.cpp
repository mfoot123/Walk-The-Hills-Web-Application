#include "DatabaseServer.h"

DatabaseServer::DatabaseServer() : SimpleServer(AF_INET, SOCK_STREAM, IPPROTO_TCP, 8080, "127.0.0.1", 250)
{
	launch();
}

void DatabaseServer::launch()
{
	while (true)
	{
		std::cout << "waiting . . ." << std::endl;
		accepter();
		handler();
		responder();
		std::cout << "DONE" << std::endl;
	}
}

void DatabaseServer::accepter()
{
	struct sockaddr_in address = this->get_socket()->get_address();
	int addrlen = sizeof(address);
	this->new_socket = accept(this->get_socket()->get_sock(), (struct sockaddr*)&address, (socklen_t*)&addrlen);

	if (new_socket == INVALID_SOCKET)
	{
		std::cout << "Could not accept \n";
	}
	int bytes = recv(new_socket, this->buffer, sizeof(this->buffer), 0);
	if (bytes < 0)
	{
		std::cout << "Could not read client data";
	}
	std::string request(this->buffer);
	this->client_request = request;
}

void DatabaseServer::handler()
{
	Command_Parser server_parser(this->client_request);
	int index = server_parser.find_cmd_index();

	std::map< std::string, std::vector<std::string>> all_comments;
	std::map<std::string, std::vector<float>> report;
	float rating = 0.0;

	switch (index)
	{
	case 0:
		all_comments = this->pullman_routes.get_all_comments();
		break;

	case 1:
		this->pullman_routes.add_record(server_parser.get_route_name(), server_parser.get_comment(), server_parser.get_rating(), server_parser.get_flag());
		break;

	case 2:
		this->pullman_routes.add_comment_only(server_parser.get_route_name(), server_parser.get_comment());
		break;

	case 3:
		report = this->pullman_routes.safety_report();
		break;

	case 4:
		rating = this->pullman_routes.get_route_safety(server_parser.get_route_name(), server_parser.get_flag());
	default:
		break;
	}
}

void DatabaseServer::responder()
{
	this->action_taken = "Welcome to the database server. This page is a test display and will not be seen in the future.";
	this->serverMessage = "HTTP/1.1 200 OK\nContent=Type: text/html\nContent-Length: ";

	std::string response = "<html><h1>" + action_taken + "</h1></html>";
	serverMessage.append(std::to_string(response.size()));
	serverMessage.append("\n\n");
	serverMessage.append(response);

	int bytesSent = 0;
	int totalBytesSent = 0;
	while (totalBytesSent < serverMessage.size())
	{
		bytesSent = send(new_socket, serverMessage.c_str(), serverMessage.size(), 0);
		if (bytesSent < 0)
		{
			std::cout << "could not send response";
		}
		totalBytesSent += bytesSent;
	}
	std::cout << "sent response to client";

	closesocket(new_socket);
}
