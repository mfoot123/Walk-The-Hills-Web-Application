#ifndef CONNECTINGSOCKET
#define CONNECTINGSOCKET

#include "SimpleSocket.h"


namespace HDE
{
	class ConnectingSocket : public SimpleSocket
	{
	public:

		ConnectingSocket(int domain, int serivce, int protocol, int port, const char* ip);

		int connect_to_network(int sock, struct sockaddr_in address);

	private:

	};


}

#endif