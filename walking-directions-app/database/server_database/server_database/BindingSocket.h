#ifndef BINDINGSOCKET
#define BINDINGSOCKET

#include "SimpleSocket.h"


namespace HDE
{
	class BindingSocket : public SimpleSocket
	{
	public:

		BindingSocket(int domain, int serivce, int protocol, int port, const char* ip);

		int connect_to_network(int sock, struct sockaddr_in address);

	private:

	};


}

#endif